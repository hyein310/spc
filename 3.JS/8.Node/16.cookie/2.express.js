const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  // 쿠키 설정
  // res.cookie(쿠키이름, 쿠키값, 옵션);
  res.cookie("number", "1234");

  res.send("은행 방문&접수 완료");
});

app.get("/readcookie", (req, res) => {
  const yourcookie = req.cookies;
  console.log("내가 가져온 쿠키: ", JSON.stringify(yourcookie));
  res.send(`니가 가져온 쿠키:  ${JSON.stringify(yourcookie)}`);
});

// 파괴하기 위해서는 res.clearCookie(쿠키이름, 쿠키값, 쿠키옵션)

app.listen(port, () => {
  console.log("server is open!");
});
