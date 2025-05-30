const express = require("express");
const PORT = 3000;
const sqlite = require("better-sqlite3"); // 동기로 동작할 수 있게 하는 라이브러리, 따로 promise로 처리하지 않아도 됨

const db = sqlite("users.db");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/login", (req, res) => {
  //   const data = req.query.username;
  //   console.log("data :: ", data);
  const { username, password } = req.body;
  console.log("username:: ", username);
  console.log("pw:: ", password);

  const usernameDb = db.prepare(
    `SELECT * FROM users where username = ? and password = ?`
  );
  const result = usernameDb.get(username, password);

  console.log("db:: ", result);

  if (result != undefined) {
    res.send("success");
  } else {
    res.send("fail");
  }
});

app.listen(PORT, () => {
  console.log("server is open");
});
