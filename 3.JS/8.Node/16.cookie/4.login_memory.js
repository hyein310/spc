const express = require("express");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const sqlite3 = require("sqlite3");

const app = express();
const port = 3000;
const db = new sqlite3.Database("user.db");

const users = [
  { id: 1, username: "user1", password: "1234" },
  { id: 2, username: "user2", password: "5678" },
];

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

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("username:: ", username);

  db.get(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, row) => {
      if (row) {
        // console.log("res : ", row.username);
        req.session.user = { username: row.username, password: row.password };
        res.send("로그인성공");
      } else {
        // console.log("res : ", user);
        res.send("로그인실패");
      }
    }
  );

  //   const user = result.find(
  //     (u) => u.username === username && u.password === password
  //   );

  //   if (user) {
  //     // res.send(`로그인 성공`);
  //     res.json({ message: "로그인 성공" });
  //   } else {
  //     res.send(`로그인 실패`);
  //     // res.status({ message: "로그인 성공" });
  //   }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send(`로그아웃 완료!`);
});

app.listen(port, () => {
  console.log("server is open");
});
