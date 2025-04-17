const fs = require("fs");
const data = "집에 가고싶어요..\n";

console.log("파일 쓰기 전");
// 옵션을 주지 않으면 덮어쓰기 됨, 파일이 없다면 새로 생성해서 쓰임
// flag : "a" 옵션을 주면 append가 됨
fs.writeFile("example.txt", data, { encoding: "utf-8", flag: "a" }, (err) => {
  if (err) {
    console.error("에러 존재 : ", err);
  } else {
    console.log("에러 없음, 쓰기 완료");
  }
});

fs.writeFileSync("example.txt", data);

console.log("파일 쓰기 후");
