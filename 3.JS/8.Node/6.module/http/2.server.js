const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(`<h1><meta charset="utf-8">안녕하세요, node.js 웹서버 입니다..</h1>`);
});

server.listen(3000);
