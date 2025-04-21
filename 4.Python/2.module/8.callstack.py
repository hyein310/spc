import module_a

def start_program():
    print("메인에서 이 함수 호출")
    # module_a.func_a1()
    try:
        module_a.func_b1(5)
    except Exception as e:
        print("알 수 없는 오류: ", type(e).__name__, ": ", e)

# 파이썬에서의 메인 함수
if __name__ == "__main__":
    # print(__name__)
    start_program()