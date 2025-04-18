import requests # requests 의 목적은 '요청' -> 파싱, 분석, 로드 X
# beautifulsoup : 텍스트에서 html로 변환해서 읽어주는 애 (파싱) ("bs4" 라고 줄여말하기도 함)

url = "https://example.com" # json 형태가 아님
res = requests.get(url)
data = res.text

# 이 결과는 자료구조로 볼 때, html이 아닌 문자열 str임
print(data)