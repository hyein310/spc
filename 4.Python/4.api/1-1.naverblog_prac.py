# 네이버 검색 API 예제 - 블로그 검색
import os
import sys
import urllib.request
import json

# response_body의 type이 bytes이기 때문에 json.load() 형태로 받으면 dict 형태로 변환됨..

client_id = "7Okkqgn7By5o2qi95m_J"
client_secret = open("secret.txt", "r").read()
encText = urllib.parse.quote("선릉역 맛집")
url = "https://openapi.naver.com/v1/search/blog?query=" + encText # JSON 결과
# url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText # XML 결과
request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id",client_id)
request.add_header("X-Naver-Client-Secret",client_secret)
response = urllib.request.urlopen(request)
rescode = response.getcode()
if(rescode==200):
    response_body = response.read()
    res_dic = json.loads(response_body)
    print(res_dic)
else:
    print("Error Code:" + rescode)