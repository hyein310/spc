import os;
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(dotenv_path="../../.env")
# load_dotenv() 이렇게 해도 상위 라이브러리에서 env 파일을 찾기도 함

client = OpenAI(
    api_key = os.getenv("OPEN_AI_KEY") # 어차피 기본 환경변수명이어서 이렇게 안해도 됨
)

# client = OpenAI()

model_list = client.models.list()
for m in model_list :
    print(m.id)