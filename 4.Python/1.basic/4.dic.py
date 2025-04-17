# nodejs의 객체 와 비슷하게 파이썬에서는 dictionary 에 담음. 키 값도 " " 처리 해줘야 함
my_dic = {
    "name": "Alice",
    "age": 25,
    "location": "Seoul"
}

print(my_dic)
print("내 이름은 ", my_dic["name"])
print("내 나이는 ", my_dic["age"])
my_dic["age"] = 10 # 수정 가능
print("내 나이는 ", my_dic["age"])


my_dic["car"] = "현대 K5"
print(my_dic)

key_list = my_dic.keys() # dict_keys(['name', 'age', 'location', 'car'])
print("딕셔너리 ", key_list)

key_list = list(my_dic.keys()) # ['name', 'age', 'location', 'car']
print("키들은 ", key_list)

key_list = list(my_dic.values()) # ['Alice', 10, 'Seoul', '현대 K5']
print("값들은 ", key_list)

for key, value in my_dic.items():
    print(f'키: {key}, 값: {value}')

# 키: name, 값: Alice
# 키: age, 값: 10
# 키: location, 값: Seoul
# 키: car, 값: 현대 K5