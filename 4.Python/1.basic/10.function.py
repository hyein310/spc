def greet(name):
    print(f"Hello, {name}!")
    # 리턴값 없음

greet("alice")

# 인자 두개 받기
def add(a,b):
    print(a)
    return a+b
    # 리턴이 있는 것

result = add(2,4)
print(result)

# 함수 인자의 기본값
def greet_default(name="Guest"):
    print(f"Hello, {name}")

greet_default()
greet_default("Hyein")

# 함수 인자 위치 지정
def exam(a,b,c):
    print(f"a: {a}, b: {b}, c: {c}")

exam(1,2,3)
exam(a=1,b=2,c=3)

def full_gugudan():
    for i in range(2, 10):
        print(f"{i}단")
        for j in range(1, 10):
            print(f"{i} * {j} = {i*j}")

full_gugudan()

# 다시 찾아보기
# print("-"*50)
# for i in range(2, 10):
#     print()