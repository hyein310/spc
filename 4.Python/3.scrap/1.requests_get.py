import requests

url = "https://jsonplaceholder.typicode.com/users"
res = requests.get(url)
users = res.json()

# print(res) # 출력 결과 :  <Response [200]> 객체 안에 담겨 온다
# print(users) # 출력 결과 : json 형태의 객체 리스트 [{},{}, .. , {}]

for user in users:
    # print(user)
    # print("-"*10)
    # print(user["name"]) -> 이름 출력
    id = user["id"]
    name = user["name"]
    username = user["username"]
    email = user["email"]

    print(f"{id:2} {name:20} {username:15} {email:20}") # 글자 포맷팅 (글자 수 지정해서 표현)
    # print(f"{id:<2} {name:20} {username:>15} {email:20}") # 글자 포맷팅 (align 정렬 <,>로 가능)