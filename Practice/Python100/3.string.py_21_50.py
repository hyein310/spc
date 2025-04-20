# 21
letters = "python"
print(letters[0], letters[2])

# 22
license_plate = "24가 2210"
print(license_plate[4:8]) # 앞 포함: 뒤 미포함

# 23
string = "홀짝홀짝홀짝"
print(string[::2]) 

# 24 문자열 뒤집기
string = "PYTHON"
# 24-1. for 반복문
reverse_str = ""
for i in string:
    reverse_str = i + reverse_str
print(reverse_str)
    # 24-2. reverse 
    # 파이썬에는 문자열 reverse가 존재하지 않고 리스트 reverse 존재. 
    # 문자열을 리스트로 리스트의 reverse() 이용 역순, 리스트를 문자열로
string_list = list(string)
string_list.reverse()
print("".join(string_list)) # 리스트를 문자열로..
    # 24-3. [::-1] 
    # [시작:끝:규칙] 
print(string[::-1])

# 25
phone_number = "010-1111-2222"
print(" ".join(phone_number.split("-")))
print(phone_number.replace("-"," "))

# 26
print(phone_number.replace("-",""))

# 27
url = "http://sharebook.kr"
print(url.split(".")[1])

# 28
# str은 수정할 수 없음
# lang = 'python'
# lang[0] = 'P'
# print(lang)

# 29
string = 'abcdfe2a354a32a'
for i in string:
    if(i == "a"):
        print(i.upper(), end="")
    else: print(i, end="")

# 30
# replace 메서드는 원본은 그대로 두고, 새로운 문자열 리턴
string = 'abcd'
string.replace('b', 'B')
print(string) # abcd

# 31
a = "3"
b = "4"
print(a + b) # 34

# 32
print("Hi" * 3) # HiHiHi

# 33
print("-"*80)

# 34
t1 = "python"
t2 = "java"
print((t1 + " " + t2 + " ") * 4)

# 35
name1 = "김민수" 
age1 = 10
name2 = "이철희"
age2 = 13
print("이름: %s 나이: %d" % (name1, age1))
print("이름: %s 나이: %d" % (name2, age2))

# 36
print("이름: {} 나이: {}".format(name1, age1))
print("이름: {} 나이: {}".format(name2, age2))

# 37
print(f"이름: {name1} 나이: {age1}")
print(f"이름: {name2} 나이: {age2}")

# 38 
상장주식수 = "5,969,782,550"
int_type = 상장주식수.replace(",","")
print(int(int_type))

# 39
분기 = "2020/03(E) (IFRS연결)"
print(분기.split("(")[0])

# 40
data = "   삼성전자    "
print(data.strip())

# 41
ticker = "btc_krw"
print(ticker.upper())

# 42
ticker2 = "BTC_KRW"
print(ticker2.lower())

# 43
hello = "hello"
print(hello.capitalize()) # Hello , captitalize : 파스칼 기법

# 44
file_name = "보고서.xlsx"
print(file_name.endswith("xlsx")) # True

# 45
print(file_name.endswith(("xlsx", "xls"))) # True

# 46
file_name2 = "2020_보고서.xlsx"
print(file_name2.startswith("2020")) # True

# 47
a = "hello world"
print(a.split(" "))

# 48
print(ticker.split("_"))

# 49
date = "2020-05-01"
print(date.split("-"))

# 50
data = "039490     "
print(data.rstrip())