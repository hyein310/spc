from flask import Flask, render_template, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

client = OpenAI()

# 각 학년별 커리큘럼 데이터
curriculums = {
    1: ["기초 인사", "간단한 문장", "동물 이름"],
    2: ["학교 생활", "가족 소개", "자기 소개"],
    3: ["취미와 운동", "날씨 묘사", "간단한 이야기"],
    4: ["쇼핑과 가격", " 음식 주문", "여행 이야기"],
    5: ["역사와 문화","과학과 자원", "사회 이슈"],
    6: ["미래 계획", "진로 탐색", "세계 여행"]
}

@app.route("/")
def home():
    return render_template("home.html", grades=curriculums.keys())

@app.route('/grade/<int:grade>')
def grade(grade):
    if grade in curriculums:
        curriculums_with_index = list(enumerate(curriculums[grade]))
        return render_template("grade.html", grade=grade, grades=curriculums.keys(), curriculums=curriculums_with_index)
    return "해당 학년은 존재하지 않습니다.", 404

@app.route('/grade/<int:grade>/curriculum<int:curriculum_id>', methods=['GET','POST'])
def curriculum(grade, curriculum_id):
    if grade in curriculums and 0 <= curriculum_id < len(curriculums[grade]):
        curriculum_title = curriculums[grade][curriculum_id]

        if request.method == 'POST':
            user_input = request.form['user_input']
            print("사용자 응답 : ", user_input)
            print("커리큘럼 : ", curriculum_title)
            res = client.chat.completions.create(
                model="gpt-4o-mini",
                # messages=[
                #     {"role":"system", "content":"당신은 영어 교사 입니다. 다음 학생의 {curriculum_title} 상황에 대해서 영어로 답변을 하는 사람입니다."}
                #     {"role":"user", "content": user_input}
                # ],
                messages=[
                    {"role":"system", "content":(
                        f"당신은 초등학교 {grade} 학년 학생을 지도하는 영어 교사입니다."
                        f"학생이 {curriculum_title} 에 대해서 학습할 수 있도록 도와주어야 합니다."
                        f"학생이 한국말로 질문을 하더라도, 영어로 다시 해당 학생이 질문을 할 수 있도록 잘 유도하고 타일러야 합니다."
                        f"학생이 지속적으로 한국말을 하더라도, 당신은 절대로 한국말로 답변해서는 안됩니다."
                    )},
                    {"role":"user", "content": user_input}
                    ],
                temperature=0.7,
            )
            chat_res = res.choices[0].message.content.strip()
            print("챗봇 응답 : ", chat_res)
            return jsonify({"res":chat_res})

        return render_template("curriculum.html", grade=grade, curriculum_title=curriculum_title)
    return "해당 커리큘럼은 존재하지 않습니다.", 404

# @app.route()

if __name__ == "__main__":
    app.run(port=8080)
