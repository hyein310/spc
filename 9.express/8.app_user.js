const express = require("express");
const app = express();
const PORT = 3000;
let userList = {};
let id = 0; //epoch 값

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello, ex");
});

// 사용자 조회
// /users
app.get("/users", (req, res) => {
  res.send(userList); // text/html; charset=utf-8 (문자열 형태로 전달, default 값)
  // res.json(); // application.json 형태로 전달
});

// 사용자 생성
// /users
app.post("/users", (req, res) => {
  id += 1;
  userList[id] = req.body.name;
  res.send("사용자 생성 완료");
});

// 사용자 정보 수정
// /user/:id
app.put("/users/:id", (req, res) => {
  id = req.params.id;
  userList[id] = req.body.name;
  res.send("사용자 수정 완료");
});

// 사용자 삭제
// /users/:id
app.delete("/users/:id", (req, res) => {
  id = req.params.id;
  delete userList[id];
  res.send("사용자 삭제 완료");
});

app.listen(PORT, () => {
  console.log("server open~~");
});
