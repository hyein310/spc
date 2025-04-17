const express = require("express");
const morgan = require("morgan");

const PORT = 3000;
const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));

// 미들웨어 선언하려면 header의 content-type을 보고 판단할 수 있음
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 기본값 true
app.use(express.text());

app.post("/submit-json", (req, res) => {
  const data = req.body;
  console.log(data);
  //   res.send("응답 완료"); // res.send의 기본 응답값 200
  //   res.status(201).send(); // 응답값의 헤더에 201, body의 내용에 아무것도 안보냄
  //   res.status(202).end(); // 응답값의 헤더에 202, 응답하지 않음
  const jsonData = {
    result: "success",
    msg: "보내기 성공",
  };
  //   res.status(201).send(data); // 응답값의 헤더에 201, body의 내용에 아무것도 안보냄
  res.json(jsonData);
});

app.post("/submit-form", (req, res) => {
  const data = req.body; // 현재 텍스트가 json이 아니라 urlencoded 형식으로 들어옴
  console.log(data);
  res.send(data);
});

app.post("/submit-text", (req, res) => {
  const data = req.body; // 현재 텍스트가 json이 아니라 urlencoded 형식으로 들어옴
  console.log(data);
  res.send(data);
});

app.listen(PORT, () => {
  console.log("server is open!");
});
