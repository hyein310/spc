# 101
# True/Fasle 데이터 타입 : bool

# 102
print(3 == 5) # Fasle

# 103
print(3 < 5) # True

# 104
x = 4
print(1 < x < 5) # True

# 105
print ((3 == 3) and (4 != 3)) # True

# 106
# print(3 => 4)
# = 연산자는 대소비교연산자 뒤에 위치 해야함

# 107
if 4 < 3:
    print("Hello World")
# 조건이 맞지 않기 때문에 출력 X

# 108
if 4 < 3:
    print("Hello World.")
else:
    print("Hi, there.") # Hi, there.

# 109
if True :
    print ("1")
    print ("2")
else :
    print("3")
print("4") # 1 2 4

# 110
if True :
    if False:
        print("1")
        print("2")
    else:
        print("3")
else :
    print("4")
print("5") # 3, 5

# ------------------- input 부분 전부 주석 처리 ------------------------


# 111
# hi = input("입력: ")
# print(hi*2)

# 112
# input_num = input("숫자를 입력하세요: ")
# print(int(input_num)+10)

# 113
# input_num = input("숫자: ")
# if(int(input_num) % 2 == 0):
#     print("짝수")
# elif(int(input_num) % 2 == 1): print("홀수")
# else: print("0")

# 114
# input_num = input("입력값: ")
# num = 20 + int(input_num)
# if num > 255:
#     print(255)
# else:
#     print(num)

# 115
# input_num = input("입력값: ")
# num = int(input_num) - 20
# if num > 255:
#     print(255)
# elif num < 0:
#     print(0)
# else:
#     print(num)

# 116
# current_time = input("현재시간: ")
# if current_time[-2:] == "00":
#     print("정각")
# else:
#     print("정각이 아님")

# 117
# fruit = ["사과", "포도", "홍시"]
# input_value = input("좋아하는 과일은? ")
# if(input_value in fruit):
#     print("정답")
# else: print("오답")

# 118
# warn_investment_list = ["Microsoft", "Google", "Naver", "Kakao", "SAMSUNG", "LG"]
# input_value = input("투자 종목: ")
# if(input_value in warn_investment_list):
#     print("투자 경고 종목")
# else: print("투자 경고 종목이 아님")

# 119
# fruit = {"봄" : "딸기", "여름" : "토마토", "가을" : "사과"}
# input_value = input("제가 좋아하는 계절은: ")
# if(input_value in fruit.keys()):
#     print("정답")
# else: print("오답")

# 120
# fruit = {"봄" : "딸기", "여름" : "토마토", "가을" : "사과"}
# input_value = input("제가 좋아하는 과일은: ")
# if(input_value in fruit.values()):
#     print("정답")
# else: print("오답")

# 121
# input_value = input("영어 입력: ")
# if(input_value.islower()):
#     print(input_value.upper())
# else: print(input_value.lower())

# 122
# score = input("학점 : ")
# if int(score) >= 81 & int(score) <= 100:
#     print(f"grade is A")
# elif int(score) >= 61 & int(score)<=80:
#     print(f"grade is B")
# elif int(score) >= 41 & int(score)<=60:
#     print(f"grade is C")
# elif int(score) >= 21 & int(score)<=40:
#     print(f"grade is D")
# else: print(f"grade is E")

# 123
# exchange = {
#         "달러": 1167, 
#         "엔": 1.096, 
#         "유로": 1268, 
#         "위안": 171
#         }
# money = input("입력: ")
# num, currency = money.split()
# print(float(num) * exchange[currency], "원")

# 124
# num1 = input("input number1: ")
# num2 = input("input number2: ")
# num3 = input("input number3: ")
# num_list = (int(num1), int(num2), int(num3))
# print(max(num_list))

# 125
