from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.1)

# 우리 대화를 저장할 공간
memory = ConversationBufferMemory()

conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True
)

# prompt = ChatPromptTemplate.from_messages([
#     {"human","{input}"}
# ])

# chain = prompt | llm

def chat(msg):
    res = conversation.predict(input=msg)
    return res.content

# def chat(msg):
#     res = chain.invoke({"input": msg})
#     return res.content

print(chat("안녕"))
print(chat("우리 무슨 이야기를 할까?"))
print(chat("난 스포츠에 대한 이야기를 하고싶어"))