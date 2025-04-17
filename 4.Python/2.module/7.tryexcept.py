try:
    result = 10/0
except ZeroDivisionError():
    print("0으로 나눌 수가 없습니다.")

print("다음 거 실행 가능")

def convert_str_to_int(string):
    result = int(string)
    return result


def convert_str_to_int(string):
    try:
        result = int(string)
        return result
    except ValueError:
        return "숫자만 입력해주세요"
    

    