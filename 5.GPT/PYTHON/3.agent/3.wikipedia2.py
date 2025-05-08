from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType

load_dotenv()
llm = OpenAI(temperature=0.0) # agent 선택과 연동을 해야하는데 창의적으로 이것저것 하는 것은 안됨... 그래서 명확하게 deterministic하게..

tools = load_tools(["wikipedia", "llm-math"]) # pip install llm-math

# 에이전트 초기화
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True, # 운영할 땐 끄는 건데 지금은 상세 내역을 살펴보기 위해서..
)

prompt = """
1. Find thie list of public holidays in South Korea with their specific 
2.
3.
Please list each calculation step by setp clearly.
"""

result = agent.invoke({"input": "대한민국의 법정 공휴일 날짜는? 그 날짜들의 월과 일을 알려줘."})
print(result["output"])