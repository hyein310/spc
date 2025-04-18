# pip install beautifulsoup4
# pip install bs4

from bs4 import BeautifulSoup

html_doc = """
<html>
<head>
    <title>간단한 HTML 예제</title>
</head>
<body>
    <h1>안녕하세요</h1>
    <p>이것은 간단한 HTML 예제입니다..</p>
</body>
</html>
"""

soup = BeautifulSoup(html_doc, "html.parser")
print(html_doc)
print("-"*10)
print(soup)
# print(type(soup))  # <class 'bs4.BeautifulSoup'>


# print(html_doc.title) 불가능
print(soup.title)
print(soup.h1.text) # h1의 value를 원할 때
