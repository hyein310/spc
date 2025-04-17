// const express = require("express");
// const morgan = require("morgan");
// const path = require("path");

// const app = express();
// const PORT = 3000;
// let sliceData = [];

// // 보내줄 데이터 정의
// // 200개의 객체를 가진 배열 생성
// const data = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`);

// app.use(morgan("dev"));
// app.use(express.json());
// // app.use(express.static("public")); // /에 있는 것이 기본 값
// // app.use(path.join(__dirname, "public", "idex.html"));

// app.get("/", (req, res) => {
//   console.log("메인 홈");
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.use(express.static("public"));

// app.get("/get-items", (req, res) => {
//   const arrayIndex = 5;

//   data.map((item, index) => {
//     console.log("data[] : ", item);
//     let cnt = data.splice(index, index + arrayIndex);
//     console.log("cnt[] : ", cnt);
//     // for (let i = index; i <= index + arrayIndex - 1; i++) {
//     //   console.log("items : ", data[index]);
//     // }
//   });

//   // if (index % arrayIndex == 0) {
//   // for (let i = item; i <= item * cnt; i++) {
//   //   cnt++;
//   //   console.log("items : ", item);
//   //   return item;
//   // }
//   // }

//   // 미션1. 원하는 갯수 만큼만 보내주려면 어떻게 설계?
//   //       입력 파라미터를 어떻게 정해야 할까?
//   // 미션1-1. 백엔드 요청 (fetch)
//   // 미션1-2. 데이터 받아오기 (res)
//   // 미션1-1. 화면에 렌더링 (dom)
//   // 미션2. 원하는 갯수만큼만 보내주려면 어떻게 설계??
//   //        입력 파라미터를 어떻게 정해야 할까??
//   // 미션2-1. 그래서, 난 어떻게 이 많은걸 나눌까~~~
//   // 미션2-2. 이걸 구현.

//   res.json(data); // 만약 값이 json 형태이면, send 말고 res.json 사용
// });

// app.listen(PORT, () => {
//   console.log("server is open~~");
// });
