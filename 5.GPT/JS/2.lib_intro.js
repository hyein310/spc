const { OpenAI } = require("openai");
require("dotenv").config({ path: "../../.env" });

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

async function getGPTRes(userInput) {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "you are a helpful assistants", // 기본적인 시스템 프롬프트
      },
      {
        role: "user",
        content: userInput,
      },
    ],
    temperature: 0.7,
  });
  return res.choices[0].message.content;
}

async function chatWithUser() {
  const userInput = "집에 가고싶다..";
  const chatGPTRes = await getGPTRes(userInput);
  console.log("챗봇 응답 :: ", chatGPTRes);
}

chatWithUser();
