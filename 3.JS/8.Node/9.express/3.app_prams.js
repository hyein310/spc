const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello, main page");
});

// express 가 url 경로에 가변인자를 받기 위해서 콜론(:)을 사용하도록 정했음
app.get("/user/:id", (req, res) => {
  const id = req.params.id; // 위에 가변 인자(id)는 req.params에 담겨서 온다
  res.send(`사용자 정보, ID : ${id}`);
});

app.get("/user/:id/profile", (req, res) => {
  const id = req.params.id; // 위에 가변 인자(id)는 req.params에 담겨서 온다
  res.send(`사용자 정보 상세페이지, ID : ${id}`);
});

// search?keyword=programming&category=javascript
// curl "localhost:3000/search?keyword=programming&category=javascript"
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const category = req.query.category;
  res.send(`검색 키워드 : ${keyword}`);
  // res.send(`검색 카테고리 : ${category}`); // send는 한번만
});

app.listen(PORT, () => {
  console.log(`${PORT} server is open~`);
});
