def func_a1():
    print("module_a: func_a1 호출됨")
    func_a2()

def func_a2():
    print("module_a: func_a2 호출됨")
    func_a3()

def func_a3():
    print("module_a: func_a3 호출됨")
    func_hello()

def func_hello():
    print("module_a: func_hello 호출됨")
    func_goodbye()

def func_goodbye():
    print("module_a: func_goodbye 호출됨")
    raise RuntimeError("의도적으로 에러 발생")


def func_b1(v):
    print("module_a: func_b1 호출됨")
    func_b2(v)

def func_b2(v):
    print("module_a: func_b2 호출됨")
    func_b3(v)

def func_b3(v):
    print("module_a: func_b3 호출됨")
    wrong_value = str(v)
    result = wrong_value * "x"
    print("최종 계산 : ", result)

# import 될 때는 실행 안 됨
if __name__ == "__main__":
    print("module_a의 메인 함수")