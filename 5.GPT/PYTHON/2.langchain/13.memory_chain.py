from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory

from langchain_core.runnables import RunnableWithMessageHistory
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.1)

# 우리 대화를 저장할 공간
memory = ChatMessageHistory()

prompt = ChatPromptTemplate.from_messages([
    {"system", "You are a helpful assistant."},
    MessagesPlaceholder(variable_name="history"),
    {"human", "{input}"}
])

chain = prompt | llm | StrOutputParser

chain_with_memory = RunnableWithMessageHistory(
    chain,
    lambda _: memory,
    input_messages_key="input",
    output_messages_key="history"
)

print(chain_with_memory.invoke({"input":"안녕"}, config={"configurable": {"session_id":"user1"}}))
print(chain_with_memory.invoke({"input":"우리 무슨 이야기를 할까?"}, config={"configurable": {"session_id":"user2"}}))
print(chain_with_memory.invoke({"input":"난 스포츠에 대한 이야기를 하고싶어"}, config={"configurable": {"session_id":"user1"}}))
print(chain_with_memory.invoke({"input":"근데 우리 지금까지 무슨 이야기 하고있었지?"}, config={"configurable": {"session_id":"user2"}}))
