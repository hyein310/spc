import os

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain_core.runnables import RunnableLambda

load_dotenv()

# llm = ChatOpenAI(model="gpt-4o-mini")

# tools = load_tools(["llm-math"])