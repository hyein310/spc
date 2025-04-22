from flask import Flask, url_for, request, redirect
import sqlite3

app = Flask(__name__)



@app.route("/")
def home():
    return redirect(url_for("static", filename="index.html"))

@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        input_name = request.form["username"]
        input_pw = request.form["password"]
        print("input user:: ", input_name)

        connection = sqlite3.connect('users.db', check_same_thread=False)
        cursor = connection.cursor()
        
        cursor.execute('SELECT * FROM users WHERE username=? AND password=?', (input_name, input_pw))
        data = cursor.fetchall()
        print("data:: ", data)

        connection.close()
        if (data == []): 
            return f"존재하지 않는 아이디"
        
        else: 
            return f"{input_name} 로그인 성공"
        

    else:
        return f"로그인 실패"


if __name__ == "__main__":
    app.run(debug=True)