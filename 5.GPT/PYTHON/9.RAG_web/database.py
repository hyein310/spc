# 미션. 랭체인 라이브러리 왕창~
import os
import json
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.text_splitter import CharacterTextSplitter
# from langchain_chroma import Chroma
from langchain_community.vectorstores import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

PERSIST_DIR = "./chroma_db"
COLLECTION_NAME = "my-data"
store = None
DATA_DIR = "./DATA"
PROMPT_FILE = "./prompt.json"

# 프롬푸트 코드

prompt = ChatPromptTemplate.from_template("""
당신은 문서 기반으로 사용자의 질문에 답변하는 챗봇입니다.
다음 문서를 참고해서 사용자의 질문에 답하시오.

문서:
{context}

질문:
{question}

답변:
""")

def list_files():
    files = [f for f in os.listdir(DATA_DIR)
             if os.path.isfile(os.path.join(DATA_DIR, f))]
    print(files)
    return files

def delete_files(file_path):
    # 1. DB에서 파일 삭제
    # 컬렉션 내에서 해당 파일을 파싱하면서 생긴 데이터를 지워야하는데
    # metadat에 파일명이 잘 저장 되어있음 (metadat.source)
    result = store._collection.get(where={"documnet":file_path})
    docs = result.get("documnet", [])
    print("존재하는 문서 수: ", len(docs))

    store._collection.delete(where={"documnet":file_path})

    # 2. 파일 자체를 삭제
    path = os.path.join(DATA_DIR, file_path)
    if os.path.exists(path):
        os.remove(path)


# LLM 설정
llm = ChatOpenAI(model='gpt-4o-mini')

output_parser = StrOutputParser()

def create_vector_db(file_path):
    global store
    
    loader = PyPDFLoader(file_path)
    documents = loader.load()

    # 우리의 메타데이터 주소
    


    print(f"총페이지수: ", len(documents))

    text_splitter = CharacterTextSplitter(
        separator="\n\n", # 문서 구분할 단위
        chunk_size=1000, 
        chunk_overlap=100
    )
    texts = text_splitter.split_documents(documents)

    embeddings = OpenAIEmbeddings()

    if not os.path.exists(PERSIST_DIR):
        os.makedirs(PERSIST_DIR)
        
    # 폴더도 있고, 파일도 있으면, 불러오기
    if os.path.isdir(PERSIST_DIR) and os.listdir(PERSIST_DIR):
        store = Chroma(
            collection_name=COLLECTION_NAME,
            embedding_function=embeddings,
            persist_directory=PERSIST_DIR)
        return store
    else: # 새로 만들기
        store = Chroma.from_documents(
            texts, 
            embeddings, 
            collection_name=COLLECTION_NAME,
            persist_directory=PERSIST_DIR
        )
        
    return store
    
def answer_question(question):
    # DB로부터 검색해서.. 체인 invoke하는 코드까지...
    if store is None:
        return "문서가 업로드 되지 않았습니다. 먼저 PDF를 업로드 해주세요."
    
    docs = store.similarity_search(question, k=5)
    context = "\n\n".join([doc.page_content for doc in docs])
    
    # 체인 구성
    chain = prompt | llm | output_parser

    result = chain.invoke({
        "context": context, "question": question
    })    
    
    return f"질문: {question}\n응답: {result}\n"
