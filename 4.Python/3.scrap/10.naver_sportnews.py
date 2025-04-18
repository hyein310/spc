# https://sports.news.naver.com/index

# 함수 이용해서 리팩토링 해보기!!!

# 미션1. 네이버 뉴스의 제목만 가져와서 출력
# 미션2. 해당 뉴스의 원본 URL 가져오기. URL 클릭했을 때 그 사이트로 이동하도록 
import requests
from bs4 import BeautifulSoup

url = "https://sports.news.naver.com/index"
res = requests.get(url)
soup = BeautifulSoup(res.text, "html.parser")

div_content = soup.select("div#content .title")
a_content = soup.select("div#content a.link_today")

for link in a_content:
    print("링크는 :: " ,link["href"])
    detail = requests.get(f"{link["href"]}")
    soupDetail = BeautifulSoup(detail.text, "html.parser")
    print("soupDetail ::: ", soupDetail)
    detail_content = soupDetail.select("#comp_news_article span.article_p")
    print("content ::: ", detail_content)


for i in div_content:
    print("title: ",i.text)



# 미션 3-1. 해당 뉴스 기사 페이지의 상세 내용도 가져오기
## 동적 컨텐츠를 가져와야해서 돌아가지 않음 ..
## 클라이언트 사이드 PC에서 그려짐.. 즉 JS script가 실행되는 건 클라이언트 브라우저 안에서만 실행

# 미션 3-2. 긴 기사 내용의 앞에 100글자만 화면에 출력
# 미션 3-3. 내가 짠 코드가 구조가 좋은지 살펴보기 (함수화)

