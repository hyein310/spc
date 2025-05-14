from dotenv import load_dotenv
import os

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import TextLoader # 텍스트 파일 불러오기
from langchain.text_splitter import RecursiveCharacterTextSplitter # 텍스트 파싱
from langchain_community.vectorstores import Chroma
# from langchain_chroma import Chroma

from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

load_dotenv()



# 저장할 공간 정의
PERSIST_DIR = "./chroma.db"

def create_vector_db():
    # 1. 텍스트 문서 읽게 시키기
    loader = TextLoader("./my-docs.txt", encoding='utf-8')
    documents = loader.load()

    # 문서에 메타데이터 추가
    documents = [Document(page_content=doc.page_content, metadata={"source":"egaglesdocs.txt"}) for doc in documents]

    # 2. 문서 안의 내용을 쪼개서 vector화 후 저장
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.split_documents(documents)

    # print("청크1", texts[0])
    # print("청크2", texts[1])

    embeddings = OpenAIEmbeddings()

    store = Chroma.from_documents(texts, embeddings, collection_name="egales", persist_directory=PERSIST_DIR)
    return store


def load_vector_db():
    embeddings = OpenAIEmbeddings()

    store = Chroma(collection_name="egales", persist_directory=PERSIST_DIR, embedding_function=embeddings)
    return store

if os.path.exists(PERSIST_DIR):
    store = load_vector_db()
else:
    store = create_vector_db()

# 3. 대화하기 위한 모델 정의
llm = ChatOpenAI(model='gpt-4o-mini', temperature=0)

# 4. 데이터 추출할 소스 정의
retriever = store.as_retriever()

# 5. 질문 템플릿 생성 
# 나의 질문 데이터에 정보가 없으면 대답하게 하지 않도록 하고 싶음... 그렇게 설정하면 됨!
template = """
다음 내용을 참고해서 사용자의 질문에 답변하시오:
{context}

만약, 정보가 없으면 모른다고 답변해줘. 정보가 있으면, 정보를 가져온 출처를 알려줘.
내용이 길 경우 리스트 형태로 번호를 매겨서 답변해줘.
질문 : {question}

답변을 작성하고 마지막에 "출처: " 라고 해서 문서의 출처를 명시해줘.
"""

prompt = ChatPromptTemplate.from_template(template)

chain = (
    {"context":retriever, "question": RunnablePassthrough()} | prompt |llm
)

# res = chain.invoke("한화 이글스의 주요 멤버에 대해서 알려주세요")
# print(res.content)

def answer_question(question):
    result = chain.invoke(question)

    if "출처" in result.content:
        answer, source = result.content.split("출처: ", 1)
        return f"질문: {question}\n응답: {answer}\n출처: {source}"
    else:
        answer = result.content.strip()
        source = "출처 정보를 찾을 수 없습니다.."


print(answer_question("한화 이글스의 주요 멤버에 대해서 알려줘"))
print(answer_question("한화 이글스의 현재 감독에 대해서 알려줘"))
print(answer_question("한화 이글스의 현재 순위와 승점에 대해서 알려줘"))