const express = require("express");
const morgan = require("morgan");
const OpenAI = require("openai");
const path = require("path");

require("dotenv").config({ path: "../../../.env" });

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const app = express();
const port = 3000;

// 미들웨어 설정 (예: JSON 파싱)
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// 기본 라우트 설정
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.post("/api/send-message", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received message:", message);

    // Use OpenAI to process the message
    const resAI = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "you are a helpful assistants", // 기본적인 시스템 프롬프트
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });

    const aiMessage = resAI.choices[0].message.content;

    res.json({
      message: "Message received",
      questionMsg: message,
      aiResponse: aiMessage,
    });
  } catch (error) {
    console.error("Error processing message with OpenAI:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
