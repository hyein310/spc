# 외부 라이브러리 패키지임
# ex) npm i 패키지명
# 파이썬은 pip i 패키지명
# 만약 패키지를 설치하면 가상환경 상에서 설치됨

# https://pypi.org/project/pip/

import requests

# 네이버 
res = requests.get("https://www.naver.com")
print("웹 페이지 내용: ", res) # 객체인 것 확인, 객체 타입은 Response
print("헤더 정보: ", res.headers)
print("바디 데이터: ", res.text)