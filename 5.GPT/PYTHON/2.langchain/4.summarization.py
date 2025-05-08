from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv
from langchain_core.runnables import RunnableLambda

load_dotenv()

# template = "다음의 글을 3문장으로 요약하시오:\n\n{article}"
template = "다음의 글을 3문장으로 요약하시오. 각 줄은 50글자 이하로 작성하시오. \n\n 예) 1.xxx\n 2.xxx\n 3.xxx\n\n 본문: {article}"
prompt = PromptTemplate(
    input_variables=["article"],
    template=template
)
llm = OpenAI(temperature=0.4) # 요약이 목적이기 떄문에 창의성을 낮추기

chain = prompt | llm | RunnableLambda(lambda x: {"summary": x.strip()})

input_text = {"""
한화 이글스가 드디어 긴 침체의 터널에서 벗어나며 반등의 날개를 펼치고 있다. 몇 시즌 동안 하위권에 머물며 팬들의 아쉬움을 자아냈던 한화는, 2025 시즌 들어 확연히 달라진 경기력과 팀 분위기로 시선을 끌고 있다. 성적만 보더라도 전반기 승률 5할을 유지하며 중위권 싸움을 벌이고 있고, 일부 전문가들은 '포스트시즌 진출도 충분히 가능하다'는 긍정적인 평가를 내리고 있다.
그 중심에는 새로 합류한 외국인 선수들과 젊은 국내 선수들의 성장세가 있다. 특히 에이스 역할을 톡톡히 해내고 있는 외국인 투수 A는 1점대 ERA를 기록하며 팀의 마운드를 안정시키고 있고, 중심 타선의 B 선수는 연일 멀티히트를 기록하며 타선을 이끌고 있다. 여기에 유망주들의 빠른 성장도 눈에 띄는데, 고졸 2년 차인 내야수 C는 뛰어난 수비와 타격 센스를 겸비하며 팀의 핵심 자원으로 자리잡았다.
감독 교체 이후 팀의 분위기도 많이 바뀌었다. 수비 중심의 야구와 치밀한 경기 운영, 선수들과의 적극적인 소통을 강조한 새로운 리더십은 선수들에게 자신감을 불어넣고 있다. 실패를 두려워하지 않고 도전하는 플레이가 늘어났고, 벤치의 응원과 덕아웃의 활기가 눈에 띄게 좋아졌다.
무엇보다 팬들과의 소통 역시 빼놓을 수 없다. SNS와 팬미팅, 홈경기 이벤트 등 다양한 채널을 통해 팬들과의 거리를 좁히려는 노력이 지속되고 있고, 실제로 대전 한화생명이글스파크의 관중 수는 지난 시즌 대비 눈에 띄게 증가했다. 한화는 다시 '보고 싶은 야구'를 해주고 있는 것이다.
아직 시즌은 길고, 순위 싸움은 예측 불허다. 하지만 지금의 한화는 분명 과거와 다르다. 흔들려도 쉽게 무너지지 않는 단단함, 그리고 승리에 대한 갈망이 보인다. 다시 날기 시작한 독수리의 비행이 어디까지 이어질지, 팬들은 조심스러운 기대를 품고 있다
"""
}

result = chain.invoke(input_text)

print("요약 결과는 :")
print(result["summary"])
