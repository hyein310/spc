const express = require("express");
const app = express();
const PORT = 3000;

// 라우트를 만드는 과정
// 사용자는 나의 앱에 루트 디렉토리에 GET 요청을 할 수 있다.
app.get("/", (req, res) => {
  // 기본 header, body 잘 만들어짐
  res.send("Hello, Express~!");
});

app.get("/user", (req, res) => {
  // 기본 header, body 잘 만들어짐
  res.send("Hello, User");
});

app.listen(PORT, () => {
  console.log(`${PORT} server is open!`);
});
