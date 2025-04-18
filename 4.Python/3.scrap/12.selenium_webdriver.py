# pip install selenium
# pip install webdriver_manager

# https://pypi.org/project/webdriver-manager/

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

import time
import csv

driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
driver.get("https://www.naver.com")
# driver.get("https://www.google.com")

search_box = driver.find_element(By.NAME, "query")
# search_box = driver.find_element(By.NAME, "q")
search_box.send_keys("Python programming") # 글자 입력만 해라
search_box.submit() # 제출해라

time.sleep(5) # 10초동안만 켜졌다가 꺼짐

list = driver.find_elements(By.CLASS_NAME, "info_area")

####################################
# 제목 뽑아보기!!!!

for li in list:
    print("리스트 : ", li.text)
    ele = li.find_elements(By.CLASS_NAME, "item_title")
    print("ele : ", ele)

# Copy element
#main_pack > section.sc_new.sp_nbook._prs_bok_lst._slog_visible > div.api_subject_bx._nshopping_book_pc > div.book_list_wrap._book_content_root > div > ul > li:nth-child(1) > div > div.info_area > a

# driver.save_screenshot("naver_search_result.jpg") # 캡쳐해라
driver.quit()