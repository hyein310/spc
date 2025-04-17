numbers = [1,2,3,4,5]

for num in numbers: 
    print(num)

for num in numbers:
    if num % 2 == 0: 
        print(f"숫자 {num} 는 짝수 입니다.")
    else: 
        print(f"숫자 {num} 는 홀수 입니다.")

even_nums = []
for num in numbers:
    if num % 2 == 0:
        even_nums.append(num)

print("원래 목록은: ", numbers)
print("짝수 목록은: ", even_nums)

students = {"John": 85, "Jame":75, "Julia": 100, "Sophie": 80 }
for name, score in students.items():
    if score > 80:
        print(f'이름 {name}은 합격 입니다.')
    else:
        print(f'이름 {name}은 불합격 입니다. (점수 {score})')