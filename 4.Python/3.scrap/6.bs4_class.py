from bs4 import BeautifulSoup

html_doc = """
<html>
<head>
    <title>간단한 HTML 예제</title>
</head>
<body>
    <div class="container">
        <h1>안녕하세요</h1>
        <p>이것은 간단한 HTML 예제입니다..</p>
    <div>
    <ul>
        <li>항목 1</li>
        <li>항목 2</li>
        <li>항목 3</li>
    </ul>
    <div class="footer">
        <p id="copyright">저작권 copyrigtht 2025. 내꺼</p>
    </div>
</body>
</html>
"""

soup = BeautifulSoup(html_doc, "html.parser")
# 클래스가 컨테이너인 div 가져오기
container_div = soup.find("div", class_="container") # 파이썬에서 class 사용하기 때문에 _ 사용
print(container_div)
print(container_div.h1)

# footer text 가져오기
footer_txt = soup.find("div", class_="footer")
print(footer_txt.p.text)

copyright = soup.find("p", id="copyright")
print(copyright.text)