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
lang = 'python'
lang[0] = 'P'
print(lang)
