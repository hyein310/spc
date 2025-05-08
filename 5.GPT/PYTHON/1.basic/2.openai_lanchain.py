from dotenv import load_dotenv
from langchain_openai import OpenAI

load_dotenv(dotenv_path="../../.env")

# client = OpenAI(
#     api_key = os.getenv("OPEN_AI_KEY") # 어차피 기본 환경변수명이어서 이렇게 안해도 됨
# )

llm = OpenAI()
print(llm)

prompt = "회사 이름을 작명하고 싶어, 나의 회사는 아케이드 게임을 만드는 회사야"

result = llm.generate([prompt])
for data in result.generations:
    print(data[0])