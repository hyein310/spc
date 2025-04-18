import requests

url = "https://jsonplaceholder.typicode.com/users"

# JS에서 불렀던 객체를 python에서는 Dict라고 부름.. 
new_post = {
    "userId": 1,
    "title": "hello",
    "body": "world",
}

res = requests.post(url, json=new_post)
print(res.json())
print("-"*10)


# PUT : 전체 수정
post_id = 1
updated_post = {
    "userId": 1,
    "title": "hello again",
    "body": "world again",
}
# https://jsonplaceholder.typicode.com/users/{post_id}
res = requests.put(f"{url}/{post_id}", json=updated_post)
print(res.json())

# PATCH : 부분 수정
print("=== PATCH ===")
patch_data = {
    "title": "partial title update"
}

res = requests.patch(f"{url}/{post_id}", json=patch_data)
print(res.json())


print("=== DELETE ===")
res = requests.delete(f"{url}/{post_id}")
print(res.status_code)
print(res.json())