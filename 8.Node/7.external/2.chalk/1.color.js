// import chalk from "chalk";
const chalk = require("chalk");

// package.json 타입 오류 주의(npm 라이브러리마다 다름)... common.js(require), module(import)

console.log(chalk.green("성공 메세지는 초록색으로!"));
console.log(chalk.red.bold("에러 발생시 빨간 볼드체"));
console.log(chalk.bgBlue.white("정보 메세지는 파란바탕에 하얀글씨"));
console.log(chalk.yellow.underline("경고 메세지는 노란색, 밑줄"));
