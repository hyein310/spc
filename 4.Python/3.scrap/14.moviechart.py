import requests
from bs4 import BeautifulSoup 
import csv
import json

# import openpyxl 엑셀로 저장하고 싶을 때

URL = "https://www.moviechart.co.kr/rank/realtime/index/image"
# https://www.whatismybrowser.com/guides/the-latest-user-agent/chrome
# 웹 스크래핑이 안되는 사이트에게 User-Agent를 크롬이라고 설명하는 부분
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
}

# HTML 요청
res = requests.get(URL, headers=headers)
# if(res.status_code == 200):
#     print("성공")
res.raise_for_status() # 오류 발생 시 예외 발생
soup = BeautifulSoup(res.text, "html.parser")

# 결과 저장 리스트
movies = []
movies_json = []

# 미션. 영화 랭킹을 가져오기
# 제목, 이미지URL, 상세페이지링크
title = soup.select("#content .movie-title a")
for i in title:
    print("제목: ", i.text)
    detail_link = "https://www.moviechart.co.kr/" + i["href"]
    print("상세 링크: "+ detail_link)
    print("\n")
    movies.append([i.text, detail_link])
    # JSON은 일반 리스트로 저장할 수 없어서 , dict 형식으로 저장해야 함
    movies_json.append({
        "title" : i.text,
        "detail_link": detail_link
    })

movie_img = soup.select("#content .movieBox-item img")
for i in movie_img:
    # print("img :: ", i["src"].split("&")[3]) # 큰 이미지 값
    print("img :: "+ "https://www.moviechart.co.kr/"+ i["src"]) # 섬네일 이미지 값
    img_link = "https://www.moviechart.co.kr/"+ i["src"]
    movies.append([img_link])
    movies_json.append({
        "img_link": img_link
    })



csv_filename = 'movie_chart.csv'
# https://pypi.org/search/?q=csv
with open(csv_filename, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['제목', '상세 링크', '이미지 URL'])
    writer.writerows(movies)

    print(f"CSV 저장완료: {csv_filename}")

# json 파일로 저장
json_filename = "movie_chart.json"
with open(json_filename, "w", newline="", encoding="utf-8") as f:
    json.dump(movies, f, ensure_ascii=False, indent=4)
    print(f"JSON 저장완료: {json_filename}")
    