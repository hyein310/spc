from flask import Flask, render_template, request, jsonify, send_from_directory
from langchain_openai import OpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
llm = OpenAI(temperature=0.7, max_tokens=1000)
prompt = ChatPromptTemplate.from_messages([
    {"role":"system", "content": "당신은 소프트웨어 개발자로 코드 리뷰를 전문적으로 하는 사람입니다."},
    {"role":"user", "content": """
    다음 링크 {giturl}으로 가서 소스코드를 보고, 당신의 의견을 말해주세요. 개선해야할 부분이 있다면, 어디를 어떻게 수정해야하는지 알려주세요.
     

    """}
]
)

chain = prompt | llm | StrOutputParser()

@app.route('/')
def index():
    return send_from_directory(app.static_folder, "index2.html")

@app.route("/api/check", methods=['POST'])
def check():
    data = request.get_json()
    github_url = data.get('github_url')

    # 미션1. 사용자로부터 받은 github 웹주소를 기반으로 raw 형태로 변경
    # 앞 도메인 바꾸고, blub -> refs/heads

    # https://github.com/hyein310/spc/blob/main/3.JS/4.Canvas/7.pacman.html
    # https://raw.githubusercontent.com/hyein310/spc/refs/heads/main/3.JS/4.Canvas/7.pacman.html

    giturl = github_url.replace("blob", "refs/heads")
    giturl = giturl.replace("github", "raw.githubusercontent")

    print("giturl: ", giturl)


    # 미션2. request로 위에 변경한 url로부터 소스코드를 받아온다.

    analaysis = chain.invoke({"giturl":giturl})
    # 미션3. 원래 하던대로..


    return {"result": analaysis}


if __name__ == '__main__':
    app.run(debug=True)