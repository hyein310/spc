const express = require("express");
const path = require("path");
const axios = require("axios");
require("dotenv").config({ path: "../../../.env" });
const openAiKey = process.env.OPEN_AI_KEY;

// console.log(process.env.OPENAI_API_KEY);
const app = express();
const port = 3000;

const {
  getRecentConversation,
  newSession,
  getAllSessions,
  getCurrentSession,
  getConversationBySession,
  saveMessage,
  getSessionById,
} = require("./database3");

// Basic route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index3.html"));
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// 새로운 세션 생성 - API 네이밍은 좋은 스타일은 아님.. 그냥 이해를 돕기 위해서...
app.post("/api/new-session", (req, res) => {
  const result = db.prepare("INSERT INTO session DEFAULT VALUES").run();
  res.json({ success: true, sessionId: result.lastInsertRowid });
});

// 전체 세션 목록 조회
app.get("/api/all-sessions", (req, res) => {
  const sessions = getAllSessions();
  res.json({ allSessions: sessions });
});

// 최근 세션의 대화 내용 다 가져오기
app.get("/api/current-session", (req, res) => {
  const session = getCurrentSession();
  const conversationHistory = getConversationBySession(session.id);
  res.json({
    id: session.id,
    start_time: session.start_time,
    conversationHistory,
  });
});

// 특정 세션 대화 내용 가져오기
app.get("/api/session/:sessionId", (req, res) => {
  const sessionId = req.params.sessionId;
  const session = getSessionById(sessionId);
  const history = getConversationBySession(sessionId);

  res.json({
    id: session.id,
    start_time: session.start_time,
    conversationHistory: history,
  });
});

// system: 시스템 프롬푸트
// user: 사용자 질문
// assistant: 챗봇 응답
app.post("/api/chat", async (req, res) => {
  const { sessionId, userInput } = req.body;
  console.log("userInput: ", userInput, "sessionId: ", sessionId);
  // 이전 대화 내용에 추가
  // conversationHistory.push({role:'user', content: userInput}) // DB에 쿼리문 INSERT

  const previousConversation = getRecentConversation();
  saveMessage("user", userInput, 1);

  const chatGPTResponse = await getChatGPTResponse(previousConversation);
  console.log(chatGPTResponse);
  console.log("-----");
  console.log("보낼전체대화내용:", previousConversation);
  console.log("-----");
  // conversationHistory.push({role:'assistant', content: chatGPTResponse})

  saveMessage("assistant", chatGPTResponse, 1);

  res.json({ message: chatGPTResponse });
});

const CHATGPT_URL = "https://api.openai.com/v1/chat/completions";

async function getChatGPTResponse(previousConversation) {
  const response = await axios.post(
    // URL, body, header
    CHATGPT_URL,
    {
      model: "gpt-3.5-turbo", // gpt-4o, gpt-4o-mini, 등등 우리의 모델
      messages: [
        // { role: 'system', content: 'You are a helpful assistant. Please remember our conversion history in memory and respond accordingly. 모든 답변은 최대한 간결하게 200글자 아래로 답변해줘.' },
        {
          role: "system",
          content:
            "너는 스포츠 트레이너로 운동에 대해서 상세한 답변을 해줄수 있어. 운동과 관련된 질문이 아닐경우, 해당 질문은 적절하지 않다고 답변해줘. 모든 답변은 최대한 간결하게 200글자 아래로 답변해줘.",
        },
        // { role: 'user', content: userInput },
        ...previousConversation, // DB로부터 가져와야함.. SELECT
      ],
      temperature: 0.2, // 최대한 딱딱하게, 펙트 중심으로
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiKey}`,
      },
    }
  );

  return response.data.choices[0].message.content; // 응답이 담겨있는 자료구조
}

// Server listening logic
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
