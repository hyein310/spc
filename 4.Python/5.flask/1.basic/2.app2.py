from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

users = [
    {
    "id":1, "name":"Alice", "age":20, "phone": "123-456-7890"
    },
    {
    "id":2, "name":"Bob", "age":30, "phone": "222-456-7890"
    },
    {
    "id":3, "name":"Charlie", "age":35, "phone": "333-456-7890"
    },
    {
    "id":4, "name":"Alice", "age":25, "phone": "444-456-7890"
    },
]

@app.route("/")
def main():
    return f"main page"

@app.route("/users")
def get_users():
    return jsonify(users) # res.json(users) 와 같음 json 형태로 보낸다는 것
    # return users 알아서 바꿔주기는 하지만 jsonify로 명시해주는 것이 좋음

@app.route("/users/<int:user_id>")
def get_userId(user_id):
    # user = None
    # for u in users:
    #     if u["id"] == user_id:
    #         user = u
    #         break # 찾았으면 중단하는 것이 효율적인 검색

    # 위에 있는 5줄 짜리 코드를 한줄로 표현하기
    # 모던 파이썬 스타일
    user = next((user for user in users if user["id"] == user_id), None)

    if user is not None:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404

@app.route("/search") #/search?name=Alice
def search_user():
    query = request.args.get("name")
    if not query:
        data = {'error': 'Name is required. 한글 테스트'}
        # make_response() : 응답 객체 생성
        response = make_response(jsonify(data))
        response.headers["Content-Type"] = "application/json; charset=utf-8"
        return response
    
    results = [user for user in users if query.lower() in user['name'].lower()]
    return jsonify(results)

if __name__ == "__main__":
    app.run()