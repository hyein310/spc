from dotenv import load_dotenv

from langchain.agents import initialize_agent, AgentType
from langchain_openai import ChatOpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_core.runnables import RunnableLambda

# 1. 환경 변수 로딩
load_dotenv()

# 2. LLM 모델 로딩
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)

# 3. 외부 툴 로딩
tools = load_tools({"google-search"})

# 4. Agent 정의(zeroshot + react) 프롬프트 기법을 사용해서 agent 실행
agent = initialize_agent(
    llm=llm,
    tools=tools,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose = True
)

# 5. 체인
def smart_old_router(input):
    user_input = input['input']

    # 만약 이 키워드가 input 값에 들어간다면 검색을 요청할 것
    keywords = ["날씨", "검색","오늘","실시간","뉴스","가격","환율"]
    if any(k in user_input for k in keywords):
        print("[판단] Agent 사용 필요")
        res = agent.invoke(user_input)
        return{"output": res}

    # 사용자의 질문에 따라서 판단을 어떻게 할지..
    res = llm.invoke(user_input)
    # agent.invoke(input)
    return {"output": res.content.strip()}


def smart_new_router(input):
    user_input = input['input']

    judge_prompt = """
    너는 사용자의 질문에 대해서 llm에게 질문할지, 외부 툴(에이전트)를 통해서 질문할지 판단하는 시스템이야.
    그래서 사용지 질문을보고 에이전트 필요성을 "Yes" 또는 "No"로만 설명없이 대답해줘.

    사용자 질문: {user_input}
    """
    judge_res = llm.invoke(judge_prompt).content.strip().lower()
    print("[판단결과] ", judge_res)
    if "yes" in judge_res:
        print("[판단] Agent 사용 필요")
        res = agent.invoke(input)
        return{"output": res}
    else:
        res = llm.invoke(user_input)
        return {"output": res.content.strip()}


chain = RunnableLambda(smart_new_router)

# 6. 질문

inputs = [
    {"input": "서울의 오늘 날씨는 어때?"},
    {"input": "GPT-4o 모델은 어떤 특징이 있어?"},
    {"input": "2025 미국 대통령은 누구야?"},
    {"input": "AI는 우리 삶에 어떤 영향을 줄까?"},
]

# 7. 질문 설정 및 답변 출력
for item in inputs:
    print(f"\n[질문] {item['input']}")
    result = chain.invoke(item)
    print("[응답]", result['output'])