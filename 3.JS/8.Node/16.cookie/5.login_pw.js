const express = require("express");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const db = new sqlite3.Database("user.db");

app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.json());
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/user", (req, res) => {
  const user = req.session.user;

  if (user) {
    res.send(`당신은 ${username} 비밀번호는 ${password} 입니다.`);
  } else {
    res.send("로그인 하고 오세요");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   console.log("비번:: ", hashedPassword);

  db.get(
    // 나의 계정을 가져와서, bcrypt.compare로 해시를 비교한다
    "SELECT * FROM users WHERE username=?",
    [username],
    async (err, row) => {
      if (row) {
        const isMatch = await bcrypt.compare(password, row.password);
        if (isMatch) {
          req.session.user = {
            username: row.username,
            password: row.password,
          };
          res.send("로그인성공");
        } else {
          res.send("로그인 정보 없음");
        }
      } else {
        res.send("로그인실패");
      }
    }
  );
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send(`로그아웃 완료!`);
});

app.listen(port, () => {
  console.log("server is open");
});
