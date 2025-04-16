const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const users = {};
let nextId = 1;
// const user_list = [];

// app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // payload를 (즉 data영역을) 파싱해서, req.body 에 담아줘라...

app.get("/", (req, res) => {
  console.log("메인홈");
  res.sendFile(path.join(__dirname, "public", "users.html"));
});

app.use(express.static("public"));

// 사용자 조회 라우트 및 함수
app.get("/users", (req, res) => {
  console.log("사용자 조회");
  res.send(users); // text/html; charset=utf-8  <-- 문자열.. 이게 기본값
  // res.json(users); // application/json
});

// 사용자 생성 라우트 및 함수
app.post("/users", (req, res) => {
  console.log("사용자 생성: ", req.body);
  try {
    const name = req.body.name;
    users[nextId++] = name; // 나의 key 도 이름, value 도 이름이다.

    res.status(201).send("등록 성공");
  } catch (err) {
    res.status(400).send("입력 값이 존재하지 않습니다.");
  }
});

// 사용자 수정 라우트 및 함수
// PUT : 리소스 전체를 업데이트 , PATCH : 선택적 업데이트
app.put("/users/:id", (req, res) => {
  console.log("사용자 수정");
  try {
    const id = req.params.id;
    users[id] = req.body.name;

    res.status(201).send("사용자 수정 성공");
  } catch (error) {
    res.status(500).send("서버 내부 오류.");
  }
});

// 사용자 삭제 라우트 및 함수
app.delete("/users/:id", (req, res) => {
  console.log("사용자 삭제, ", req.params.id);

  try {
    const id = req.params.id;

    if (!users[id]) {
      return res
        .status(400)
        .send(`해당 사용자(ID : ${id})는 존재하지 않습니다.`);
    }
    delete users[id];

    res.status(201).send("삭제 성공");
  } catch (error) {
    res.status(500).send("서버 내부 오류.");
  }
});

app.listen(port, () => {
  console.log(`서버 레디 on ${port}`);
});
