from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        user = request.form["name"]
        print("폼 입력: ", user)
        # url_for(): url을 다른 url로 리다이렉트 할 때 사용, 엔드포인트 함수명을 인자로 받음 
        # () 안에 route 함수명을 넣으면 해당 url 주소 가져오고, 파라미터까지 전달 가능
        return redirect(url_for("user", user=user))
    else:
        return render_template("login.html")

@app.route("/user")
@app.route("/user/<user>")
def user(user=None):
    return render_template("user.html", user=user)

if __name__ == "__main__":
    app.run(debug=True)