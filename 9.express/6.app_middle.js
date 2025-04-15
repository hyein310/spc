const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

// / 경로는 app.use에 먼저 매칭되어서 경로의 index.html이 가장 우선순위가 높음
app.use((req, res, next) => {
  console.log(`MYLOG1 : ${req.method}, ${req.url}`);
  req.myData = 1234;
  next(); // 다음 middleware로 이동하게 함 // 아래에서 밑으로 순차 진행
});

app.use((req, res, next) => {
  console.log(`MYLOG2 : ${req.method}, ${req.url}`);
  req.reqTime = Date.now(); // 이숫자는 epoch 라는 값. 1970년 1월 1일 00:00:00기준
  next();
});

app.get("/", (req, res) => {
  const htmlFilePath = path.join(__dirname, "public", "index.html"); // 절대 경로(absolute path, full path)
  console.log(req.myData);
  const date = new Date(req.reqTime);

  console.log("요청 시간 : ", date.toLocaleString());
  res.sendFile(htmlFilePath);
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`${PORT} server is open!`);
});
