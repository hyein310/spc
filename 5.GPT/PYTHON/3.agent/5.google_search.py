from dotenv import load_dotenv
# LLM 관련
from langchain_openai import OpenAI
# 에이전트 구성 도구
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType


load_dotenv()
llm = OpenAI()

tools = load_tools(["google-search"])

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    # verbose=True,
)

result = agent.invoke({"input": "서울의 오늘 날씨는 어때?"})

print(result["output"])