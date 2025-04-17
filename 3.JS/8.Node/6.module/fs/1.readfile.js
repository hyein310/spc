// 별다른 말이 없으면 common js

const fs = require("fs");
// function myCallbackFunc(err, data) {
//   if (err) {
//     console.error("에러 존재 : ", err);
//   } else {
//     console.log("에러 없음, 데이터는 : ", data);
//   }
// }

// fs.readFile("example.txt", "utf8", myCallbackFunc);

console.log("파일 읽기 전");
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error("에러 존재 : ", err);
  } else {
    console.log("에러 없음, 데이터는 : ", data);
  }
});

const data = fs.readFileSync("example.txt", "utf-8");
console.log("데이터는 : ", data);

console.log("파일 읽은 후");
