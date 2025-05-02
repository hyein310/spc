require("dotenv").config({ path: "../../.env" }); // env 파일 읽어서 메모리에 올리기
const axios = require("axios");

const openAiKey = process.env.OPEN_AI_KEY;
// console.log("키는 ::: ", openAiKey);

// const url = "https://api.openai.com/v1/responses";
const url = "https://api.openai.com/v1/chat/completions";

// v1/responses : 문장을 생성해주는 API
// v1/chat/completions : 질의응답하는 API

async function getGPT() {
  const response = await axios.post(
    url,
    {
      // 본문
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "you are a helpful assistants", // 기본적인 시스템 프롬프트
          // "role": "system", "content": "you are a cooker",
          // "role": "system", "content": "you are a software engineer",
        },
        {
          role: "user",
          content: "나 배고파",
        },
      ],
      temperature: 1.0, // 정확도 (창의성)
      top_p: 0.9, // 확률 기반 토큰 선택 범위
      frequency_penalty: 0.5, // 반복 억제
      presence_penalty: 0.6, // 얼마나 새로운 주제를 가져올건지
      max_tokens: 100,
    },
    {
      // 헤더
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiKey}`,
      },
    }
  );

  return response.data.choices[0].message.content;
}

async function GPT() {
  const ai_res = await getGPT();
  console.log(ai_res);
}

GPT();
