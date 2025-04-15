const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/", (req, res) => {
  res.send("POST 메세지 잘 받았음");
});

app.put("/", (req, res) => {
  res.send("PUT 요청 받았음");
});

app.delete("/", (req, res) => {
  res.send("DELETE 요청 수행 완료");
});

app.get("/user", (req, res) => {
  res.send("user 정보 조회");
});

app.post("/user", (req, res) => {
  res.send("user 생성");
});

app.put("/user", (req, res) => {
  res.send("user 정보 수정");
});

app.delete("/user", (req, res) => {
  res.send("user 정보 삭제");
});

app.listen(PORT, () => {
  console.log(`${PORT} server is open~`);
});
