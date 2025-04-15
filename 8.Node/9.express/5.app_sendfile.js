const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const path = require("path");

// fs 모듈 불러와서 파일 읽어서 전달하는 것
// const data = fs.readFileSync("index.html", "utf-8");

// 우리의 홈에 있는 public 폴더를 정적 폴더로 정의
// 외부에서 public이 보이는 것이 아니라 그 안 내용을 사용해야 함
app.use(express.static("public"));

app.get("/", (req, res) => {
  const htmlFilePath = path.join(__dirname, "public", "index.html"); // 절대 경로(absolute path, full path)
  res.sendFile(htmlFilePath);
});

// app.get("/dog1.jpg", (req, res) => {
//   const jpgFilePath = path.join(__dirname, "public", "dog1.jpg");
//   res.sendFile(jpgFilePath);
// });

app.listen(PORT, () => {
  console.log(`${PORT} server is open!`);
});
