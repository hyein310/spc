const express = require("express");
const path = require("path");
require("dotenv").config({ path: "../../../.env" });
const openAiKey = process.env.OPEN_AI_KEY;
const { default: axios } = require("axios");

const app = express();
const port = 3000;

const conversationHistory = [];

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// system: 시스템 프롬푸트
// user: 사용자 질문
// assistant: 챗봇 응답
app.post("/api/chat", async (req, res) => {
  const { userInput } = req.body;
  conversationHistory.push({ role: "user", content: userInput });
  const chatGPTResponse = await getChatGPTResponse(userInput);
  console.log(chatGPTResponse);
  console.log("-----");
  console.log("보낼전체대화내용:", conversationHistory);
  console.log("-----");
  conversationHistory.push({ role: "assistant", content: chatGPTResponse });
  res.json({ msg: chatGPTResponse });
});

const url = "https://api.openai.com/v1/chat/completions";

async function getChatGPTResponse(userInput) {
  const response = await axios.post(
    // URL, body, header
    url,
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Please remember our conversion history in memory and respond accordingly.",
        },
        // { role: "user", content: userInput },
        ...conversationHistory,
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiKey}`,
      },
    }
  );

  return response.data.choices[0].message.content;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
