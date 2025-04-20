# 81
scores = [8.8, 8.9, 8.7, 9.2, 9.3, 9.7, 9.9, 9.5, 7.8, 9.4]
*vaild_score, a, b = scores
print(vaild_score)

# 82
a, b, *vaild_score = scores
print(vaild_score)

# 83
a, *vaild_score, b = scores
print(vaild_score)

# 84
temp = {}

# 85
snack = {"메로나": 1000, "폴라포": 1200, "빵빠레": 1800}
print(snack)

# 86
snack["죠스바"]= 1200
snack["월드콘"]= 1500
print(snack)

# 87
print("메로나 가격: ", snack["메로나"])

# 88
snack["메로나"]= 1300

# 89
del snack["메로나"]

# 90
# icecream = {'폴라포': 1200, '빵빠레': 1800, '월드콘': 1500, '메로나': 1000}
# icecream['누가바']
# key 값이 지정되어있지 않아서 오류 발생

# 91
inventory = {"메로나": [300, 20], "비비빅": [400, 3], "죠스바": [250, 100]}
print(inventory)

# 92
print(inventory["메로나"][0] , "원")

# 93
print(inventory["메로나"][1] , "개")

# 94
inventory["월드콘"] = [500, 7]
print(inventory)

# 95
icecream = {'탱크보이': 1200, '폴라포': 1200, '빵빠레': 1800, '월드콘': 1500, '메로나': 1000}
print(list(icecream.keys()))

# 96
print(list(icecream.values()))

# 97
print(sum(icecream.values()))

# 98
icecream = {'탱크보이': 1200, '폴라포': 1200, '빵빠레': 1800, '월드콘': 1500, '메로나': 1000}
new_product = {'팥빙수':2700, '아맛나':1000}
icecream.update(new_product) # 딕셔너리 + 딕셔너리 하는 방법
print(icecream)

# 99
keys = ("apple", "pear", "peach")
vals = (300, 250, 400)
result = dict(zip(keys, vals)) # zip() 함수는 순회가능한 객체를 인자로 받고, zip 타입으로 반환
print(result)

# 100
date = ['09/05', '09/06', '09/07', '09/08', '09/09']
close_price = [10500, 10300, 10100, 10800, 11000]
close_table = dict(zip(date, close_price))
print(close_table)