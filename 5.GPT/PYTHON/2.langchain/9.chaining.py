from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv
from langchain_core.runnables import RunnableLambda


load_dotenv()

# 입력값: "주제",
# -> 주제에 맞는 회사명을 만들고
# -> 그 회사명을 기반으로, 회사의 슬로건(캐치프레이즈)을 만들 것임

# 1. 기본 프롬프트 템플릿 질의 응답
chat_prompt1 = PromptTemplate(
    input_variables=["product"],
    template="너는 회사 이름을 전문적으로 짓는 작명가야. 다음 상품/서비스를 갖는 회사명을 지어줘. 상품명: {product}"
)

chat_prompt2 = PromptTemplate(
    input_variables=["company_name"],
    template="이 회사를 잘 설명할 수 있는 (슬로건 또는 catch_phrase)를 만들어줘. 회사명: {company_name} "
)


llm = OpenAI(model="gpt-3.5-turbo-instruct", temperature=0.9)
chain1 = (
    chat_prompt1 | llm | RunnableLambda(lambda x: {"company_name": x.strip()}) | 
    chat_prompt2 | llm | RunnableLambda(lambda x: {"catch_phrase": x.strip()})
)
response1 = chain1.invoke({"product": "김치"})["catch_phrase"]
print(response1)
