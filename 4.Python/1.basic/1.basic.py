print("hello, world")

x = 5
y = 3
str = "Hello, World"

print("덧셈: ", x+y)
print(f'덧셈: {x} + {y}')

# 주석은 이렇게 표시
print(str.lower())
print(str.upper())

# string 관련 찾아보기
# strip(), split(), replace()...

s = "apple,banana,cherry"
s_list=s.split(",")
print(s)
print(s_list)
# print(s_list[3]) 초과하는 것, 인덱스에 없는 것은 예외(exception) 발생