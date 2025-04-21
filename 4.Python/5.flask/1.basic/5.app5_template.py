from flask import Flask, render_template

app = Flask(__name__)

users = ["Alice", "Bob", "Charlie", "David", "Eve"]

@app.route("/")
def home():
    return render_template("index.html", name="john")

@app.route("/users")
def get_users():
    return render_template("users.html", users=users)


if __name__ == "__main__":
    app.run(port=3000, debug=True) 
    # Debug mode: on, 파일의 변경 사항을 감지해서 서버를 다시 켜줌
    # 오류가 나면 프론트 단에 오류를 뿌려줌. 개발할 때만 debug=True 사용(커밋, 프로덕션할 때는 False)