import requests
from bs4 import BeautifulSoup 
import csv
import json
import os
import re # 밑에서 사용하는 함수 안에서 import 하는 것이 일반적이다.

# import openpyxl 엑셀로 저장하고 싶을 때
# import gspread 구글 스프레드시트에 저장하고 싶을 때
from urllib.parse import urlparse, urljoin

BASE_URL = "https://www.moviechart.co.kr"
MOVIERANK_URL = "https://www.moviechart.co.kr/rank/realtime/index/image"
# https://www.whatismybrowser.com/guides/the-latest-user-agent/chrome
# 웹 스크래핑이 안되는 사이트에게 User-Agent를 크롬이라고 설명하는 부분
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
}

# HTML 요청
res = requests.get(MOVIERANK_URL, headers=HEADERS)
# if(res.status_code == 200):
#     print("성공")
res.raise_for_status() # 오류 발생 시 예외 발생
soup = BeautifulSoup(res.text, "html.parser")

# 결과 저장 리스트
movies = []
movies_json = []

# 이미지를 저장할 디렉토리 생성
os.makedirs('thumbnails', exist_ok=True)

# sanitization : 깔끔하게, 청소
def sanitize_filename(name):
    return re.sub(r'[\\/*?:"<>| ]', '_', name) # r = replace 앞의 조건들에 온 특수문자들을 _ 로 변환
    # \ 자체가 정규 표현식에서 기능을 가지고 있음


# 미션. 영화 랭킹을 가져오기
# 제목, 이미지URL, 상세페이지링크
# title = soup.select("#content .movie-title a")
movie_info = soup.select("#content .movieBox-item")


for movie in movie_info:
    # print("제목: ", i.text)
    title_tag = movie.select_one(".movie-title h3")
    img_tag = movie.select_one("img")
    link_tag = movie.select_one("a")

    # if title_tag:
    #     title = title_tag.text.strip()
    # else:
    #     title = '제목없음'
    
    title = title_tag.text.strip() if title_tag else '제목없음'
    image_url = img_tag['src'] if img_tag and img_tag.has_attr('src') else '이미지없음'
    
    thumbnail_url = urljoin(BASE_URL, image_url)
    image_data = requests.get(thumbnail_url, headers=HEADERS).content
    # 파일명에 : 있으면 잘리기 때문에 이미지 저장이 제대로 안됨
    if len(image_data) > 0:
        safe_filename = sanitize_filename(title)
        filename = f"thumbnails/{safe_filename}.jpg"
        # wb : binary data
        with open(filename, 'wb') as f:
            f.write(image_data)
    
    detail_link = BASE_URL + link_tag['href'] if link_tag else '링크없음'
    
    print(f"제목: {title}, 이미지: {image_url}, 상세페이지: {detail_link}")
    # print("img :: ", i["src"].split("&")[3]) # 큰 이미지 값
    
    # CSV는 일반 리스트가 더 효율적인 자료구조
    movies.append([title, image_url, detail_link])
    
    # JSON은 일반 리스트로 저장할수 없음.. 그래서 Dict 로 저장해야함.
    movies_json.append({
        "title": title,
        "image_url": image_url,
        "detail_link": detail_link
    })

# csv 파일로 저장
# https://pypi.org/search/?q=csv
csv_filename = 'movie_chart.csv'
with open(csv_filename, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['제목', '이미지URL', '상세링크']) # 헤딩 한줄 쓴것
    writer.writerows(movies)

    print(f"CSV 저장 완료: {csv_filename}")

# json 파일로 저장
json_filename = 'movie_chart.json'
with open(json_filename, 'w', encoding='utf-8') as f:
    json.dump(movies_json, f, ensure_ascii=False, indent=4)

    print(f"JSON 저장 완료: {json_filename}")
    


movie_img = soup.select("#content .movieBox-item img")
for i in movie_img:
    print("img :: "+ BASE_URL + i["src"]) # 섬네일 이미지 값
    img_link = BASE_URL + i["src"]
    movies.append([img_link])
    movies_json.append({
        "img_link": img_link
    })
    thumnail_url = urljoin(BASE_URL, MOVIERANK_URL)
    img_data = requests.get(thumnail_url, headers=HEADERS).content
    if len(img_data) > 0:
        safe_filename = sanitize_filename(title)
        filename = f"thumnails/{title}.jpg"
        with open(filename, "wb") as f:
            f.write(img_data)


    