const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

app.set("view engine", "ejs"); // views 라는 폴더 안의 ejs 파일을 읽겠다
// app.set("views", "./views")

app.get("/", (req, res) => {
  //   res.sendFile(path.join(__dirname, "index.html"));
  res.render("index", { title: "내 타이틀", msg: "ejs 학습 중.." });
});

app.listen(PORT, () => {
  console.log("server is open!");
});
