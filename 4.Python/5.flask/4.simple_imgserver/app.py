from flask import Flask, jsonify, url_for, request
from flask_cors import CORS # pip install flask-cors
import random


app = Flask(__name__)
# 누구든지 나의 서버로 정보를 보낼 수 있다
CORS(app) 

# 올바르게 한 설정은?? 내가 아는 인지된 서버만 접속하게 CORS를 제한적으로 설정해야 함
CORS(app, resources={r"/random-dog": {"origins": ["http://127.0.0.1:3000", "http://localhost:3000"]}})

dog_imgs = [
"dog1.jpg",
"dog2.jpg",
"dog3.jpg",
]

@app.route("/random-dog")
def random_dog():
    random_img = random.choice(dog_imgs)
    # img_url = "static/" + random_img
    img_url = url_for("static", filename=f"img/{random_img}", _external=True) # _external 외부로 보내겠다는 것
    print(img_url)

    return jsonify({"url": img_url})

if __name__ == "__main__":
    app.run(debug=True)