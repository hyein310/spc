# 네이버 검색 API 예제 - 블로그 검색
import os
import sys
import urllib.request
import json

client_id = "7Okkqgn7By5o2qi95m_J"
client_secret = open("secret.txt", "r").read()
encText = urllib.parse.quote("선릉역 맛집")
url = "https://openapi.naver.com/v1/search/blog?query=" + encText + "&display=5" # JSON 결과
# url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText # XML 결과
request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id",client_id)
request.add_header("X-Naver-Client-Secret",client_secret)
response = urllib.request.urlopen(request)


rescode = response.getcode()
if(rescode==200):
    response_body = response.read()
    # print(response_body.decode('utf-8'))
else:
    print("Error Code:" + rescode)

items = response_body.decode('utf-8')
item_json = json.loads(items)
# print(item_json)

for item in item_json["items"]:
    print(item["title"], item["link"])