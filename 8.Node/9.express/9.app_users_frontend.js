const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");
let userList = [];
let id = 0;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("메인 홈");
  res.sendFile(path.join(__dirname, "public", "user.html"));
});

// / 기본 경로인 / 보다 라우팅 값이 먼저 와있으면 기본값이 index.html이기 때문에 아래에 선언해줘야함
app.use(express.static("public"));

// 사용자 조회
// /users
app.get("/user", (req, res) => {
  console.log("사용자 조회");
  // res.send(userList); // text/html; charset=utf-8 (문자열 형태로 전달, default 값)
  res.json(userList); // application.json 형태로 전달
});

// 사용자 생성
// /users
app.post("/user", (req, res) => {
  const user = {
    userId: id++,
    name: req.body.name,
  };
  console.log("userlist : ", userList);
  userList.push(user);
  res.json(user);
});

// 사용자 정보 수정
// /user/:id
app.put("/user/:id", (req, res) => {
  console.log("put req :  ", req.body);

  const { userId, newName } = req.body;
  const userInfo = userList.find((user) => user.userId == userId);
  userInfo.name = newName;
  res.send("정보 수정 성공");
});

// 사용자 삭제
// /users/:id
app.delete("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  // findIndex는 요소가 없을 경우 -1 반환, 반드시 체크 필요함
  const index = userList.findIndex((user) => user.userId === userId);

  if (index !== -1) {
    userList.splice(index, 1);
    res.send("삭제 완료");
  } else {
    res.send("삭제 실패, 유저 없음");
  }
});

app.listen(PORT, () => {
  console.log("server open~~");
});

// list 만을 사용한다면, 중복이 가능하기 때문에 수정/삭제가 같이 될 수도 있음
