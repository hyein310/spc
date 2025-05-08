# pip install transformers
# ~/.cache/hugggingface 디렉토리 안에 모델들이 다운로드가 됨
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

load_dotenv(dotenv_path="../../.env")
model_name = "mistralai/Mistral-7B-Instruct-v0.3" # 너무 무거워서 메모리 부족으로 무한 대기 상태..

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="auto")

# 파이프 라인 생성
generator = pipeline("text-generation", model=model, tokenizer=tokenizer)

# 질문
prompt = "what are good fitness tips?"
outputs = generator(prompt)

print(outputs[0]["generated_text"])