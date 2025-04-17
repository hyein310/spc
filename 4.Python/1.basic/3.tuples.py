# 튜플
# 리스트는 [] 대괄호, 튜플은 () 소괄호, 딕셔너리는 {} 중괄호

my_tuple = (1,2,3,4,5)
print(len(my_tuple))
print(my_tuple[0])
print(my_tuple[-1])

# 모든 기능이 다 리스트와 동일, 단 수정 불가
# 만약 변경을 시도하면 오류 발생
# my_tuple[2] =3
# TypeError: 'tuple' object does not support item assignment

# 튜플 언패킹 : 요소를 분할해서 가져오는 것
a, b, c, d, e = my_tuple
print(a)
print(a, b, c, d, e)

# 함수
# return 값을 여러개 가져올 수 있음, 그럴 때 튜플에 담아 반환
def add(a, b):
    return a + b

print("sum: ", add(a, b))

def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

stats = get_stats([1,2,3,4,5])
print(stats)