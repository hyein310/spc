from dotenv import load_dotenv
from langchain_openai import OpenAI
from flask import Flask, request, jsonify

load_dotenv(dotenv_path="../../.env")
llm = OpenAI(temperature=0.9)
app = Flask(__name__)

prompt_template = "회사 이름을 작명하고 싶어, 나의 회사는 "

# result = llm.generate([prompt_template]*5)
# for data in result.generations:
#     print(data[0].text)

@app.route("/generate", methods=["POST"])
def generate():
    # 사용자로부터 받아온 입력 처리
    data = request.get_json()
    prompt = data.get("prompt", "")

    final_prompt = prompt_template + prompt
    
    result = llm.generate([final_prompt]*5)
    results = []
    for data in result.generations:
        print(data[0].text)
        results.append(data[0].text.strip())
    return jsonify({"response": results})


if __name__ == "__main__":
    app.run(port=5000)