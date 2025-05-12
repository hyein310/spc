import os

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain_community.utilities import GoogleSerperAPIWrapper, GoogleSearchAPIWrapper, WikipediaAPIWrapper
from langchain_core.runnables import RunnableLambda
from langchain.chains import LLMMathChain
from langchain.tools import Tool
from langchain_experimental.plan_and_execute import PlanAndExecute, load_chat_planner,load_agent_executor

load_dotenv()

google_api_key = os.getenv('GOOGLE_API_KEY')
google_cse_id = os.getenv('GOOGLE_CSE_ID')

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)

llm_math_chain = LLMMathChain.from_llm(llm=llm, verbose=True)
search = GoogleSearchAPIWrapper()
wikipedia = WikipediaAPIWrapper()

tools = [
    Tool(
        name="Search",
        func=search.run,
        description="Useful for answering questions using Google Search"
    ),
    Tool(
        name="Wikipedia",
        func=wikipedia.run,
        description="Useful for looking up facts and statistic"
    ),
    Tool(
        name="Calculator",
        func=llm_math_chain.run,
        description="Useful for answering math-related question or calculations"
    ),
]

planner = load_chat_planner(llm)
executor  = load_agent_executor(llm, tools, verbose=True)

agent = PlanAndExecute(planner=planner, executor=executor, verbose=True)

# 실제 질의 생성
prompt = "영상 1988"
result = agent.invoke(prompt)