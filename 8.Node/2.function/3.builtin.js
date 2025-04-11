const stringNum = "42";
console.log(stringNum);

const number = parseInt(stringNum);
console.log(number + 2);

console.log(typeof stringNum);
console.log(typeof number);

const num2 = Number(stringNum);
console.log(typeof num2);

const User = {
  name: "hyein",
  age: 5,
};

console.log(typeof User);

// ㄱ빌트인 함수
// setTimeout(func, delay(m2))

setTimeout(() => {
  console.log("1초 후에 출력");
}, 1000);

console.log("끝");

setTimeout(() => {
  console.log("3초 후에 출력");
}, 3000);

console.log("진짜 끝");

const timerId = setTimeout(() => {
  console.log("3초 후에 출력, 허락됐나요");
}, 3000);

clearTimeout(timerId);
