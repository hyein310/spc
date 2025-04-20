# 71
my_variable = ()

# 72
movie_rank = ("닥터 스트레인지", "스플릿", "럭키")

# 73
# num1 = (1) 이렇게 입력하면 정수로 인식함. 하나의 데이터 저장의 경우 밑의 방법 이용
num1 = (1,)

# 74
# 튜플은 원소의 값을 변경할 수 없음
# t = (1, 2, 3)
# t[0] = 'a'

# 75
t = 1, 2, 3, 4
print(type(t)) # tuple

# 76
t = ('a', 'b', 'c')
t = ("A", "b", "c")
print(t)

# 77
interest = ('삼성전자', 'LG전자', 'SK Hynix')
print(list(interest))

# 78
print(tuple(interest))

# 79
temp = ('apple', 'banana', 'cake')
a, b, c = temp
print(a, b, c)
# 각각의 튜플 요소가 a, b, c에 저장되어 출력

# 80
# 1부터 99까지 짝수만 저장된 튜플
data = tuple(range(2, 100, 2))
print(data)
