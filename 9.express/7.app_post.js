const express = require("express");
const app = express();
const PORT = 3000;

const user = {};

// app.bodyParser() 는 옛날에 express에 내장되어있지 않아서 사용되었으나 4.x 버전 이후 부터는 내장 함수로 지원
app.use(express.json()); // JSON 데이터 파싱을 위한 미들웨어
// 이 함수가 사용자의 요청에서 온 JSON을 req.body라는 변수에 담아줌

app.get("/", (req, res) => {
  res.send("hello, express");
});

app.get("/user", (req, res) => {
  res.send(user);
});

app.post("/user", (req, res) => {
  console.log("사용자 요청 조회", req.body);
  const id = Date.now(); //epoch 값
  user[id] = req.body.name;
  res.send("보내기 성공");
});

app.listen(PORT, () => {
  console.log(`${PORT} server is open!`);
});
