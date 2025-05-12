from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain_core.runnables import RunnableLambda

load_dotenv()

llm_summary = ChatOpenAI(model="gpt-4o-mini", temperature=0.7) # 일반적으로 0.7
llm_translate = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7)

tools = load_tools(["arxiv"]) # 많은 외부 서비스는 대부분 API를 필요로 함. 위키피디아, arxiv는 없이 가능
agent = initialize_agent(
    tools = tools,
    llm = llm_summary,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose = True # 생각 출력
)

# 번역 체이닝 
# 프롬프트 작성
prompt1 = ChatPromptTemplate.from_template("너는 번역가야. 다음의 글을 번역 해줘 {text}")

# 체이닝
chain1 = prompt1 | llm_translate | RunnableLambda(lambda x: {"korean": x.content})

# full_chain = (
#     RunnableLambda(lambda input: {"input": input["query"]}
#     | RunnableLambda(agent.invoke)
#     | (lambda x: {"text": x["output"]})
#     | chain1
#     )
# )

# 검색 시킨 것
result = agent.invoke({"input":"최근 프롬프트 엔지니어링 관련 논문을 찾아서 요약해줘. 요약 결과는 한글로 보여줘"}) # 입력값은 input이라는 걸로 
print(result["output"]) # 결과는 output으로 나옴

# 체이닝 실행 (invoke)
response = chain1.invoke({"text":result["output"]})
# response = full_chain.invoke({"query":"최근 프롬프트 엔지니어링 관련 논문을 찾아서 요약해줘.\n\n 요약 내용은 '제목','저자','요약'dml gudxofh wkrtjdgownj"})


# 결과 출력
print(response["korean"])

