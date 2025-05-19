import os
import anthropic
from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import PromptTemplate

load_dotenv()
# api_key = os.getenv("ANTHROPIC_API_KEY")

# client = anthropic.Anthropic(api_key=api_key)

# message = client.messages.create(
#     model="claude-3-7-sonnet-20250219",
#     max_tokens=1000,
#     temperature=0.7,
#     messages=[
#         {"role":"user","content":"나는 웹툰작가야. 아무 스토리나 만들어줘."}
#     ]
# )

# print(message.content[0].text)

# 초기 모델 설정
llm = ChatAnthropic(
    model="claude-3-7-sonnet-20250219",
    # anthropic_api_key = os.getenv("ANTHROPIC_API_KEY"),  기본키
    max_tokens=1000,
    temperature=0.7,
)

res = llm.invoke("인공지능이란?")
print(res.content)

print('-'*50)

template = PromptTemplate.from_template("다음 주체에 대해 설명해주세요.\n\n주제:{topic}")
prompt = template.format(topic="GPT")

# res = llm.invoke(prompt)
# print(res.content)

chain = template | llm
res = chain.invoke({"topic":"Claude"})