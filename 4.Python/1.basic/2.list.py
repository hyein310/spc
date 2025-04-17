my_list = [1,2,3,4,5]

print(my_list)
print(len(my_list))
print("[0]: ",my_list[0])

# indexing
# -n 은 한번만 순회가 가능함
# 즉, -len부터 len까지
print("[-1]: ",my_list[-1])
print("[-5]: ",my_list[-5])

# slicing
print("[1:3] : ", my_list[1:3]) # 인텍스 1은 포함하고 3은 포함하지 않음
print("[:3] : ", my_list[:3])
print("[3:] : ", my_list[3:])

# 리스트 추가
my_list.append(6)
print(my_list)

my_list.insert(2, 99) # 두 번째 위치에 99 추가 삽입
print(my_list)

my_list.remove(99) # 특정 요소 삭제
print(my_list)

poped_ele = my_list.pop(3) # 3번째 인덱스의 요소를 빼내라
print("pop ele : ", poped_ele)
print("mylist : ", my_list)

poped_ele = my_list.pop() # 만약 아무값도 주지 않으면 맨 뒤에 요소 pop
print("pop ele : ", poped_ele)
print("mylist : ", my_list)

# 리스트 컴프리헨션
number = [x for x in range(10)] # 맨 앞의 변수(선택자)로 이 리스트의 요소를 채울 것임. 뒤에가 x가 만들어지는 조건
print(number)

numbers = [x for x in range(1,5)] # 맨 앞의 변수(선택자)로 이 리스트의 요소를 채울 것임. 뒤에가 x가 만들어지는 조건
print(numbers)

numbers = [x**2 for x in range(10)] # 맨 앞의 변수(선택자)로 이 리스트의 요소를 채울 것임. 뒤에가 x가 만들어지는 조건
print(numbers)

even = [x for x in range(10) if x % 2 == 0] # 짝수
odd = [x for x in range(10) if x % 2 == 1] # 홀수
print(even)
print(odd)