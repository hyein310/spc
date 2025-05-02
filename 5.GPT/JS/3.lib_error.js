const { OpenAI } = require("openai");
require("dotenv").config({ path: "../../.env" });

const apiKey = process.env.OPEN_AI_KEY;
if (!apiKey) {
  console.error("API 키가 올바르게 설정되어있지 않습니다..");
  process.exit(1); // 프로그램 종료
}

const openai = new OpenAI({
  apiKey: apiKey,
});

async function getGPTRes(userInput) {
  try {
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
  } catch (error) {
    if (error.status) {
      const status = error.status;
      if (status === 429) {
        console.error("Error: 요청 한도 초과(크레딧 부족)");
      } else if (status === 401) {
        console.error("Error: 해당 키에 권한이 없습니다.");
      } else if (status === 403) {
        console.error("Error: 해당 모델을 이용할 권한이 없습니다.");
      } else {
        console.error(
          `Error: 알 수 없는 오류입니다. ${status} - ${error.body}`
        );
      }
    }
  }
}

async function chatWithUser() {
  const userInput = "오늘 저녁은 뭐를 먹으면 좋을까?";
  const chatGPTRes = await getGPTRes(userInput);
  console.log("챗봇 응답 :: ", chatGPTRes);
}

chatWithUser();
