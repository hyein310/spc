from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv
from langchain_core.runnables import RunnableLambda

load_dotenv()

template = "다음 문장을 한국어로 번역해줘:\n\n{sentence}"
prompt = PromptTemplate(input_variables=["sentence"], template=template)
llm = OpenAI(
    temperature=0.3, # 번역 기능이기 때문에 최대한 정확하게 창의력 낮춤
    max_tokens=1024 # 글이 잘렸을 때, 최대 토큰 수 증가시켜서 잘리지 않게 함
             ) 

chain = prompt | llm | RunnableLambda(lambda x: {"translated": x.strip()})

result = chain.invoke({"sentence": """
The Hanwha Eagles are finally breaking free from the long tunnel of stagnation, spreading their wings for a much-anticipated comeback. After spending several seasons languishing at the bottom of the standings and leaving fans disappointed, Hanwha has made a noticeable turnaround in the 2025 season. With a .500 winning percentage in the first half of the year and solid positioning in the mid-tier rankings, some analysts are even optimistic about the team’s chances of making the postseason.
At the heart of this resurgence are new foreign signings and the rapid development of young domestic players. Ace pitcher "A", a new foreign acquisition, has posted an impressive ERA in the low 1s, bringing stability to the pitching rotation. Meanwhile, slugger "B" is leading the offense with consistent multi-hit games. Notably, sophomore infielder "C", a high school graduate, has stood out with sharp fielding and batting instincts, quickly becoming a cornerstone of the team.
Since the managerial change, the team's energy has shifted significantly. Emphasizing strong defense, strategic game management, and open communication with players, the new leadership has instilled confidence throughout the roster. There’s a noticeable increase in aggressive, fearless play, and the energy from the dugout reflects a newfound unity and enthusiasm.
Equally important is the effort to reconnect with fans. Through social media engagement, fan meetings, and entertaining home-game events, the team has rebuilt bridges with its supporters. As a result, attendance at Hanwha Life Eagles Park in Daejeon has significantly increased compared to previous seasons. Hanwha is once again playing “baseball worth watching.”
The season is still long, and the competition remains fierce. But there’s no denying that this year’s Eagles are different. They are more resilient and hungrier for victory. Fans, cautiously hopeful, are watching as the eagle takes flight once more—wondering just how far this team can soar.
"""})

print(f"한글 번역은:\n\n{result["translated"]}")