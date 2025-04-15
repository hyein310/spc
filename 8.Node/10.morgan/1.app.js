const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

// 로깅을 해주는 외부 라이브러리 = morgan
// 로그의 다양한 포맷들. 개발할 때 편한 로그: "dev",
// 운영할 때는 웹 서버같은 로그: "combined",
// 커스텀하게 설정하려면: ":method :url :status :response-time"

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hihi");
});

app.get("/user", (req, res) => {
  res.send("정보 조회");
});

app.delete("/", (req, res) => {
  res.send("정보 삭제");
});

app.listen(PORT, () => {
  console.log("server is opne!");
});
