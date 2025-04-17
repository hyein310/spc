const chalk = require("chalk");
const figlet = require("figlet");

figlet("I Love Home", (err, data) => {
  if (err) {
    console.log("에러 발생");
    console.dir(err);
    return;
  }
  console.log(chalk.cyan(data));
  console.log(chalk.bgYellow.greenBright(data));
});
