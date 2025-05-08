from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

# .env 파일 로드 (필요 없다면 생략 가능)
load_dotenv(dotenv_path="../../.env")

# 작고 빠른 모델 선택
model_name = "distilgpt2" # 훨씬 가볍고 CPU에서도 실행 가능, GPT-2의 경량 버전

# 토크나이저와 모델 불러오기
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# 파이프라인 생성 (pad_token_id 명시적으로 설정)
generator = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    pad_token_id=tokenizer.eos_token_id
)

# 프롬프트 입력
prompt = "What are some good fitness tips?"
outputs = generator(prompt, max_length=100, truncation=True)

# 출력 결과 확인
print(outputs[0]["generated_text"])
