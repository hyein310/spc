from flask import Flask # JS의 express와 비슷함
from flask import request # flask에서 요청의 구조를 담고 있는 변수명 (객체명)

# flask는 주로 5000 번대에서 열림
app = Flask(__name__) # 내가 직접 이름 문자열로 써도 되고, __name__ 이용해서 파일명 생성하기도 함

@app.route("/") # 데코레이터 : 원래는 설명을 하는 역할이었으나, 지금은 기능이 들어가 있음
def home():
    return "<h1> hello, flask! </h1>"

@app.route("/user")
@app.route("/user/<int:user_id>") # 인자를 숫자로만 받아서 int 타입으로 전달
def user(user_id="Guest"): # 기본값 Guest 지정 (가변 인자를 함수 인자(argument)로 받음)
    return f"<h1> user page! {user_id} </h1>"

@app.route("/admin/<username>")
def admin(username="Admin"): # express의 /user/:username 형식과 같음, 가변 인자(파라미터)
    return f"<h1> admin page {username} </h1>"

# 쿼리 파라미터 처리
@app.route("/search")
def search():
    query = request.args.get("q")
    page = request.args.get("page")

    return f"검색중.. 키워드: {query}, 페이지: {page}"

if __name__ == "__main__": # 파이썬의 메인 함수, 내 파일을 실행했을 떄 호출, 다른 파일에서 나를 import 할 때는 호출되지 않음
    app.run()

