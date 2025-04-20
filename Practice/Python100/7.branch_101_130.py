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
input_num = input("입력값: ")
num = 20 + int(input_num)
if num > 255:
    print(255)
else:
    print(num)

# 115
input_num = input("입력값: ")
num = int(input_num) - 20
if num > 255:
    print(255)
elif num < 0:
    print(0)
else:
    print(num)

# 116
current_time = input("현재시간: ")
if current_time[-2:] == "00":
    print("정각")
else:
    print("정각이 아님")
