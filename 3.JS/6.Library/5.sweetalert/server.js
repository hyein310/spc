const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(morgan("dev"));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "2.example.html"));
});

app.post("/api/login", async (req, res) => {
  const { email, pw } = req.body;
  console.log("input value: ", email, pw);
  await sleep(2000); // 2초 기다림
  res.json({ msg: "로그인 성공" });
});

app.listen(port, (req, res) => {
  console.log("server start");
});
