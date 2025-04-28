const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const morgan = require("morgan");
const session = require("express-session");
const { error } = require("console");

const app = express();
const PORT = 3000;

// 미들웨어
app.use(morgan("dev"));
// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "abcd1234",
    resave: false,
    saveUninitialized: true,
  })
);

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

function loginRequired(req, res, next) {
  if (!req.session || !req.session.user) {
    res.status(401).json({ msg: "로그인이 필요합니다.." });
  }
  next();
}

// 메인 API
// 아래 내용을 줄 때, 요청자가 좋아한 건지 같이 줄 수 없을까?
app.get("/api/tweets", (req, res) => {
  const qurey =
    "SELECT tweet.*, users.username FROM tweet JOIN users ON tweet.user_id = users.user_id ORDER BY tweet.tweet_id DESC";
  db.all(qurey, [], (err, tweets) => {
    // console.log(tweets);
    res.json(tweets);
  });
});

app.post("/api/tweet", loginRequired, (req, res) => {
  const { content } = req.body;
  // console.log(content);

  const qurey = "INSERT INTO tweet (content, user_id) VALUES(?, ?)";
  db.run(qurey, [content, req.session.user.userid], (err) => {
    if (err) {
      return res.status(500).json({ msg: "작성 실패" });
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
    req.session.user = {
      userid: user.user_id,
      username: user.username,
      email: user.email,
    };
    console.log("login session: ", req.session.user);
    res.json({ msg: "로그인 성공" });
  });
});

// 좋아요
app.post("/api/like/:tweet_id", loginRequired, (req, res) => {
  const tweetId = req.params.tweet_id;

  // DB에 주고 like 테이블에 쓴다
  const qurey = "INSERT INTO like(tweet_id, user_id) VALUES (?,?)";
  const qurey2 =
    "UPDATE tweet SET likes_count = likes_count+1 WHERE tweet_id = ?";

  db.run(qurey, [tweetId, req.session.user.userid], (err) => {
    if (err) {
      return res.status(500).json({ msg: "작성 실패" });
    } else {
      res.json({ msg: "작성 성공" });
    }
  });
  db.run(qurey, [tweetId]);
});

// 좋아요 취소
app.post("/api/unlike/:tweet_id", loginRequired, (req, res) => {
  const tweetId = req.params.tweet_id;

  // DB에 주고 like 테이블에 쓴다
  const qurey = "DELETE FROM like WHERE user_id=? AND tweet_id";
  db.run(qurey, [req.session.user.userid, tweetId]);
  const qurey2 =
    "UPDATE tweet SET likes_count = likes_count-11 WHERE tweet_id = ?";

  db.run(qurey2, [tweetId]);
  res.json({ msg: "성공" });
});

app.post("/api/logout", (req, res) => {
  res.session.destroy(() => {
    res.json({ msg: "로그아웃 성공" });
  });
});

app.listen(PORT, () => {
  console.log("server is open!");
  console.log("http://localhost:" + PORT);
});
