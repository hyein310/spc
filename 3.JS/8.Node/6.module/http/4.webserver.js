const fs = require("fs");
const http = require("http");

const data = fs.readFileSync("index.html", "utf-8");
const server = http.createServer((req, res) => {
  // console.log(res); // 객체 형태
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(data);
});

server.listen(3000, () => {
  console.log("server is open! I'm waiting for user!");
});
