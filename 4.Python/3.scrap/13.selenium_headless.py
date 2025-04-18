# pip install selenium
# pip install webdriver_manager

# https://pypi.org/project/webdriver-manager/

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

import time
import csv

# 창 안띄우고 실행하기 (GUI가 없는 환경이나 클라우드 등)
options = Options()
options.add_argument("--headless")

driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)


driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
driver.get("https://www.naver.com")
# driver.get("https://www.google.com")

search_box = driver.find_element(By.NAME, "query")
# search_box = driver.find_element(By.NAME, "q")
search_box.send_keys("Python programming") # 글자 입력만 해라
search_box.submit() # 제출해라

time.sleep(5) # 10초동안만 켜졌다가 꺼짐

list = driver.find_elements(By.CLASS_NAME, "info_area")

for li in list:
    ele = li.find_elements(By.CLASS_NAME, "item_title")
    print("ele : ", ele)

with open("naver_books.csv", mode="w", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["제목","링크"]) # 헤더 작성
    writer.writerows("my_book") # 데이터 작성

driver.quit()