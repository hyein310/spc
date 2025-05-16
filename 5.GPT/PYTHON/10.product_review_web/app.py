from flask import Flask, request, jsonify
import sqlite3
from openai import OpenAI
from dotenv import load_dotenv
from datetime import datetime
import os

load_dotenv()

app = Flask(__name__, static_folder='public', static_url_path='')

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route("/api/review", methods=['POST'])
def submit_rating():
    data = request.json
    rating = data.get('rating')
    review = data.get('review')
    created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()

    c.execute('''CREATE TABLE IF NOT EXISTS reviews
                 (rating INTEGER, review TEXT, created_at TEXT)''')

    c.execute("INSERT INTO reviews (rating, review, created_at) VALUES (?, ?, ?)",
              (rating, review, created_at))

    conn.commit()
    conn.close()

    print("리뷰 :: ", review)

    return jsonify({
        "message": "Review submitted successfully",
        "rating": rating,
        "review": review,
        "created_at": created_at
    }), 200

@app.route("/api/reviewList", methods=['GET'])
def get_reviews():
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()

    c.execute("SELECT rating, review, created_at FROM reviews ORDER BY created_at DESC")
    reviews = c.fetchall()

    conn.close()

    review_list = []
    for review in reviews:
        review_dict = {
            'rating': review[0],
            'review': review[1],
            'created_at': review[2]
        }
        review_list.append(review_dict)

    html_content = ""
    for review in review_list:
        html_content += f"""
        <div class="review-card">
            <div class="rating">평점: {'★' * review['rating']}</div>
            <div class="review-text">{review['review']}</div>
            <div class="review-date">{review['created_at']}</div>
        </div>
        """

    return html_content

if __name__ == '__main__':
    app.run(debug=True)
