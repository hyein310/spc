// 미션1. 파일 읽어서 그내용을 전달하는 서버 만들기
// 1. index.html 파일 읽어서 변수에 담고
// 2. req가 왔을 때, 그 변수의 내용 전달

const fs = require("fs");
const http = require("http");

const data = fs.readFileSync("index.html", "utf-8");
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(data);
});

server.listen(3000, () => {
  console.log("server is open! I'm waiting for user!");
  console.log(`http://localhost:3000`);
});
