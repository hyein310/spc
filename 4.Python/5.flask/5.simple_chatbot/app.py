from flask import Flask, request, jsonify
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/chat", methods=["POST"])
def chatbot():
    data = request.get_json() # 나한테 POST로 온 json값을 가져오기
    print("Data :: ", data)
    msg = data.get("question", "") # question을 꺼내오기
    if "배고파" in msg:
        reply_msg = "나도 배고파..🤖"
    elif "집에 갈래" in msg:
        reply_msg = "같이 가..😉"
    else:
        reply_msg = msg

    time.sleep(3) # 3초 후 응답
    return jsonify({"question": f"PYTHON: {reply_msg}"})


if __name__ == "__main__":
    app.run(debug=True)