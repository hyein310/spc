const express = require("express");
const PORT = 3000;

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("users.db");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("username:: ", username);
  console.log("pw:: ", password);

  db.each("SELECT * FROM users", (err, row) => {
    if (row.username == username && row.password == password) {
      res.send("success");
    } else {
      res.send("fail");
    }
  });

  db.close();
});

app.listen(PORT, () => {
  console.log("server is open");
});
