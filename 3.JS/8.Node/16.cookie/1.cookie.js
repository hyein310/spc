const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie);
  res.writeHead(200, { "Set-Cookie": "mycookie-test=hello" });
  res.end("쿠키 받으세용");
});

server.listen(3000, () => {
  console.log("server is open!");
});
