const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const morgan = require("morgan");
const session = require("express-session");

const app = express();
const PORT = 3000;

// 미들웨어
app.use(morgan("dev"));
// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB 연결
const db = new sqlite3.Database("tweet.db", (err) => {
  if (err) {
    console.log("DB 연결 실패");
  } else {
    console.log("DB 연결 성공");
    // sqlite에서도 외래키 기능 활성화
    // db.run("PRAGMA foregin_keys = ON");
  }
});

// 메인 API
app.get("/api/tweets", (req, res) => {
  const qurey =
    "SELECT tweet.*, users.username FROM tweet JOIN users ON tweet.user_id = users.user_id ORDER BY tweet.tweet_id DESC";
  db.all(qurey, [], (err, tweets) => {
    console.log(tweets);
    res.json(tweets);
  });
});

app.post("/api/tweet", (req, res) => {
  const { content } = req.body;
  console.log(content);

  const qurey = "INSERT INTO tweet (content, user_id) VALUES(?, ?)";
  db.run(qurey, [content, 1], (err) => {
    if (err) {
      return res.status(500).json({ error: "작성 실패" });
    } else {
      res.json({ msg: "작성 성공" });
    }
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const qurey = "SELECT * FROM users WHERE email=?";
  db.get(qurey, [email], (err, user) => {
    if (err || !user || user.password !== password) {
      // 나중에는 bcrypt 이용
      return res.status(401).json({ msg: "로그인 실패" });
    }
    res.json({ msg: "로그인 성공" });
  });
});

app.listen(PORT, () => {
  console.log("server is open!");
  console.log("http://localhost:" + PORT);
});
