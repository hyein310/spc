from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.1)

# 우리 대화를 저장할 공간
memory = ChatMessageHistory()

prompt = ChatPromptTemplate.from_messages([
    {"role": "system", "content": "You are a helpful assistant."},
    MessagesPlaceholder(variable_name="history"),
    {"role": "user", "content": "{input}"}
])

chain = prompt | llm

def chat(msg):
    res = chain.invoke({"input":msg, "history":memory.messages})
    memory.add_user_message(msg)
    memory.add_ai_message(res.content)
    return res.content

# def chat(msg):
#     res = chain.invoke({"input": msg})
#     return res.content

print(chat("안녕"))
print(chat("우리 무슨 이야기를 할까?"))
print(chat("난 스포츠에 대한 이야기를 하고싶어"))