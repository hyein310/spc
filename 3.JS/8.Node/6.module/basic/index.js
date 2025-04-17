// 함수명과 선언명이 같아야 함
const { addNum, subNum } = require("./add");

let result = addNum(2, 3);
console.log(result);

result = subNum(2, 3);
console.log(result);
