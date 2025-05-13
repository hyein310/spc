import urllib.request
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI()

# 모델은 dall-e-2 or dall-e-3 
# 사이즈 v2 : 최대 사이즈 1024x1024 보통 512x512 256x256
#       v3 : 최대 사이즈 보통 1024x1024, 1024x1792, 1792x1024
# 품질 : standard or hd
# 개수 : v2 -> 여러 개 가능, v3 -> 한 개만 가능
# response = client.images.generate(
#     model="dall-e-3",
#     prompt="A cute baby teddy bear",
#     size="1024x1024",
#     quality="hd",  # v3에서만 가능
#     n=1
# )

response = client.images.generate(
    model = "dall-e-3",
    prompt="A cute baby teddy bear",
    # size="512x512",
    size="1024x1024",
    # quality="standard",
    quality="hd",
    n=1
)

image_url = response.data[0].url
print(image_url)

# 이미지 다운로드 및 저장
# import urllib.request
# urllib.request.urlretrieve(img_url, "DATA/generated_image.png")