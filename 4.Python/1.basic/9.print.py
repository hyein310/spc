name = "John"

# 기본 프린트 구문
print("Hello", name) # 기본 띄어쓰기
print("Hello", name, "!") # 기본 띄어쓰기
print("Hello"+ name + "!") # 수동 띄어쓰기

# 2. f-문자열 (f-string) 표기법
print(f'Hello, {name}!')

# 3. 문자열 포맷팅
print("-------------")
print('Hello, {}!\nGoodBye,'.format(name))
print('Hello, {}!\nGoodBye, {}'.format(name, name))

name = "James"
age = 30

print("안녕하세요 {}님, 당신은 {}살 이군요.".format(name,age)) # 안녕하세요 James님, 당신은 30살 이군요.
print("안녕하세요 {1}님, 당신은 {0}살 이군요.".format(name,age)) # 안녕하세요 30님, 당신은 James살 이군요.

#  4. % 연산자 사용
# -- 찾아보기
# print("---------4----------")
# print("helle, s%!" %name)