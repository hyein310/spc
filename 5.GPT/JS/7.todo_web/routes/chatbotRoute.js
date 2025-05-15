const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");

require("dotenv").config({ path: "../.env" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/api/chat", async (req, res) => {
  const { question } = req.body;
  console.log("유저 메세지: ", question);

  const aiAnswer = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: question },
    ],
    temperature: 0.7,
  });

  const answer = aiAnswer.choices[0].message.content;
  console.log("answer:: ", answer);

  return res.send({ answer: `Echo: ${answer}` });
});

module.exports = router;
