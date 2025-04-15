const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
let userList = {};
let id = 0;
let userId = "userId";
let name = "name";

app.use(express.json());

app.get("/", (req, res) => {
  console.log("메인 홈");
  res.sendFile(path.join(__dirname, "public", "user.html"));
});

// / 기본 경로인 / 보다 라우팅 값이 먼저 와있으면 기본값이 index.html이기 때문에 아래에 선언해줘야함
app.use(express.static("public"));

app.get("/user.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "user.html"));
});

// 사용자 조회
// /users
app.get("/user", (req, res) => {
  res.send(userList); // text/html; charset=utf-8 (문자열 형태로 전달, default 값)
  // res.json(); // application.json 형태로 전달
});

// 사용자 생성
// /users
app.post("/user", (req, res) => {
  id += 1;
  userList[userId] = id;
  userList[name] = req.body.name;
  console.log("name : ", userList[name]);
  console.log("userlist : ", userList);
  res.send(userList);
});

// 사용자 정보 수정
// /user/:id
app.put("/user/:id", (req, res) => {
  console.log("put req :  ", req.body);
  userList[userId] = req.params.id;
  userList[name] = req.body.newName;
  res.send(userList);
});

// 사용자 삭제
// /users/:id
app.delete("/user/:id", (req, res) => {
  delete userList[req.params.id];
  res.send(userList);
});

app.listen(PORT, () => {
  console.log("server open~~");
});
