# https://pythonscraping.com/pages/page3.html

# 미션1. 해당 페이지 요청
# 미션2. 해당 페이지를 파싱해서 상품명(class=gift), 가격 출력

import requests
from bs4 import BeautifulSoup

url = "https://pythonscraping.com/pages/page3.html"
res = requests.get(url)
# print(res.text)


soup = BeautifulSoup(res.text, "html.parser")
item = soup.select("tr.gift")

for i in item:
    tds = i.select("td")
    print(f"상품명: {i.td.text} 가격: {tds[2].text}")
