from flask import Flask, render_template # nunjucks 와 비슷한 템플릿 엔진

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", name="john")
    # jinja2 template 문법 : {{}} 더블 중괄호를 사용 (ejs의 <% 변수 %>와 비슷)

if __name__ == "__main__":
    app.run()