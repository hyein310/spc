from flask import Flask, request, render_template
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
client = OpenAI()


def summarize_text(prompt):
    res = client.images.generate(
        model='dall-e-3', 
        prompt=prompt,
        n=1,
        size="1024x1024",
    )
    img_url = res.data[0].url
    print('생성된 이미지 주소: ', img_url)
    return img_url

def generate_img(prompt):
    res = client.images.generate(
        model="dall-e-2",
        prompt=prompt,
        n=1,
        size="1024x1024"
    )
    img_url = res.data[0].url
    print('생성된 이미지 주소: ', img_url)
    return img_url


@app.route('/', method=['GET', 'POST'])
def home():
    if request.method == 'POST':
        # POST 요청일때
        text = request.form['text']
        prompts = summarize_text(text)
        imgs = [generate_img(prompt) for prompt in prompts]
        return render_template('index.html', prompts=prompts, imgs=imgs)
    
    # GET 요청일 때
    return render_template('index.html', prompts=None, images=None)

if __name__ == '__main__':
    app.run(debug=True)