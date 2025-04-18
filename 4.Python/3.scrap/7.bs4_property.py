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

link_tag = soup.a # 상단의 하나만 가져오기
link_tags = soup.find_all("a")
print(link_tag)
print(link_tags)

# 태그 안의 속성값에 접근하는 방법
print(link_tag["href"])
# print(link_tags["href"]) # 불가능 (리스트 형태이기 때문에 for문 이용해야함)
for lt in link_tags:
    print(lt["href"])

print("-"*10)

img_tag = soup.img
img_tags = soup.find_all("img")
img_tag2 = img_tags[1]
# img_tag3 = img_tags[2] # [2]가 존재하지 않기 때문에 스크래핑 중단.. 예외처리가 필요함
img_tag3 = img_tags[2] if len(img_tags) > 2 else None

print(img_tags)
print(img_tag2)
print(img_tag3)

# 있을지 없을지 모르는 경우의 문법 -> 예외처리 기법.. 태그.get["##","No ##"] 을 이용해서 처리해주는 것이 좋음
print(f"Src: {img_tag["src"]}, Alt: {img_tag["alt"]}, Width: {img_tag.get["width", "No Width"]}, Height: {img_tag2.get["height","No Height"]}")
print(f"Src: {img_tag2["src"]}, Alt: {img_tag2["alt"]}, Width: {img_tag2["width"]}, Height: {img_tag2["height"]}")

