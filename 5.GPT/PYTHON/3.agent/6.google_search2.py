from dotenv import load_dotenv
# LLM 관련
from langchain_openai import OpenAI
# 에이전트 구성 도구
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType
from langchain_core.runnables import RunnableLambda
from langchain_core.prompts import PromptTemplate

load_dotenv()
llm = OpenAI()

tools = load_tools(["google-search"])

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    # verbose=True,
)

template = "다음 문장을 한국어로 번역해줘 {sentence}"
prompt = PromptTemplate(input_variables=["sentence"], template=template)

chain = prompt | llm | RunnableLambda(lambda x: {"translated": x.strip()})

result = agent.invoke({"input": "서울의 오늘 날씨는 어때?"})
tranResult = chain.invoke({result["output"]})

print("번역 완료된 답변: ",tranResult)