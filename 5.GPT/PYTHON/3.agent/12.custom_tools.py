import os
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain.tools import tool
from langchain_experimental.plan_and_execute import PlanAndExecute, load_chat_planner,load_agent_executor

load_dotenv()

# 나만의 도구 정의하기
# Flask에서 라우터 정의하던것처럼 데코레이터로 정의(@app)
# 나만의 툴도 @tool이라는 데코레이터로 정의. 함수 안의 주석도 의미가 있는 주석임. 함수의 역할을 자연어로 정의한 것
@tool
def add(query: str) -> str:
    """두 숫자를 더합니다. 형식: '숫자1' '숫자2'"""
    # 따옴표 제거
    query = query.replace("'","").replace('"',"").strip()
    # 숫자 추출해서 더하기
    nums = [int(x) for x in query.split() ]
    return nums[0] + nums[1]

@tool
def subtract(query: str) -> str:
    """두 숫자를 뺄셈합니다. 형식: '숫자1' '숫자2'"""
    # 따옴표 제거
    query = query.replace("'","").replace('"',"").strip()
    nums = [int(x) for x in query.split() ]
    return nums[0] - nums[1]

@tool
def multiply(query: str) -> str:
    """두 숫자를 곱셈합니다. 형식: '숫자1' '숫자2'"""
    # 따옴표 제거
    query = query.replace("'","").replace('"',"").strip()
    nums = [int(x) for x in query.split() ]
    return nums[0] * nums[1]

#도구 일단 담아주기
tools = [add, subtract, multiply]

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2) # agent와 연동시에는 창의력을 낮게 해서 예측이 가능하도록 해야함

agent = initialize_agent(
    tools = tools,
    llm = llm,
    agent= AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose = True
)

# result = agent.invoke({"input":"3과 4를 더하고 그결과에 다시 5를 더하시오,"})
result = agent.invoke({"input":"3과 7을 더하고 4를 빼고 3을 곱하는 계산의 답을 구하시오."})
print("최종결과 : ", result)
