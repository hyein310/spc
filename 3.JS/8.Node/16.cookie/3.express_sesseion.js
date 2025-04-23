const express = require("express");
const session = require("express-session");

const app = express();
const port = 3000;

// 세션 설정 - 세션 데이터는 기본적으로 서버의 메모리에 암호화 되어 저장됨
app.use(
  session({
    secret: "abcd1234", // 세션 데이터를 암호화하기 위한 비밀키 (대칭키)
    resave: false, // 세션 데이터가 변경되지 않아도 다시 저장할 것인지
    saveUninitialized: true, // 초기화되지 않은 세션도 저장할 것인지
  })
);

// 내 커스텀 미들웨어
function visitCounter(req, res, next) {
  // 세션에 visitCount 라는 것이 없으면 0으로 초기화..
  req.session.visitCount = req.session.visitCount || 0;

  // 방문 횟수 증가
  req.session.visitCount++;

  next();
}

// 기본 실행 시에 거쳐가는 미들웨어 단이다.
app.use(visitCounter);

app.get("/", (req, res) => {
  req.session.username = "user1";
  req.session.ticket = "spc2025";
  req.session.cart = ["python", "javascript", "mysql"];

  res.send(`당신의 방문 횟수:: ${req.session.visitCount}`);
});

app.get("/user", (req, res) => {
  const yoursession = req.session;
  console.log(yoursession);

  const { username, ticket, cart } = req.session;

  //   const username = req.session.username;
  //   const ticket = req.session.ticket;
  //   const cart = req.session.cart;

  if (username) {
    res.send(`당신의 이름은 ${username} 사용자 정보 중략`);
  } else {
    res.send(`사용자 정보가 없음......`);
  }

  //   res.send(`너의 이전 세션 정보는 : ${ticket}, ${cart}`);
});

app.get("/cart", (req, res) => {
  const yoursession = req.session;
  console.log(yoursession);

  const { username, ticket, cart } = req.session;

  //   const username = req.session.username;
  //   const ticket = req.session.ticket;
  //   const cart = req.session.cart;

  if (username) {
    res.send(`장바구니 목록은 ${cart}`);
  } else {
    res.send(`사용자 정보가 없음......`);
  }

  //   res.send(`너의 이전 세션 정보는 : ${ticket}, ${cart}`);
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("안녕히가세요..");
});

app.listen(port, () => {
  console.log("server is open");
});
