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
        <a href="https://www.naver.com">네이버 바로가기</a>
        <img src="example1.jpg" alt="예제1">
        <img src="example2.jpg" alt="예제2" width="500" height="600">
        <a href="https://www.daum.com">다음 바로가기</a>
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
link_tag = soup.select_one("a") # 첫번째 a태그
print(link_tag)
print(link_tag["href"])
print(link_tag.text)

link_tags = soup.select("a") # 모든 a태그
for lt in link_tags:
    print(lt.text, lt["href"])

div_container = soup.select_one("div.container") # css 셀렉터 스타일로 div 중에 클래스명이 container
print("div_container: ", div_container)

copyright = soup.select_one("p#copyright") # id 가 copyright
print(copyright)

div_container_p = soup.select_one("div.container p") # css 셀렉터 스타일
print(div_container_p)
