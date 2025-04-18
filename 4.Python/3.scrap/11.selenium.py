# pip install selenium
# pip install webdriver_manager

from selenium import webdriver

# 크롬을 제어할 드라이버 필요
driver = webdriver.Chrome()
driver.get("https://www.naver.com")