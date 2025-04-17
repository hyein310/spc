const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.post("/api/chat", (req, res) => {
  const question = req.body.question;
  console.log(question);
  // 미션2. 사용자가 한 말 그대로 반환하기
  //   const response = {
  //     answer: question,
  //   };
  res.json({ question });
});

app.listen(PORT, () => {
  console.log("server is open!");
});
