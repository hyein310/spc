const http = require("http");
// 서버 생성
const server = http.createServer();

// 요청이 왔을 때, 실행하기
server.on("request", (req, res) => {
  console.log("요청 왔음");
  res.writeHead(200); // 응답값
  res.end("hello"); // 데이터
});

// 연결 됐을 때, 실행하기
server.on("connection", () => {
  console.log("연결 됐음");
});

// 종료 됐을 때, 실행하기
server.on("close", () => {
  console.log("종료 됐음");
});

// 서버 실행 -> 서버 대기
// 3000 포트가 기본 값 => C언어에서는 포켓 프로그래밍이라고 함
// localhost:300
server.listen(3000);
