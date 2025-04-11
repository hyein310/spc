function plus(num1, num2) {
  return num1 + num2;
}
function minus(num1, num2) {
  return num1 - num2;
}
function multi(num1, num2) {
  return num1 * num2;
}
function div(num1, num2) {
  if (num2 === 0) {
    return "0으로 나눌 수 없습니다.";
  }
  return num1 / num2;
}

function printScreen(text) {
  console.log(text);
}

// 다음의 문제를 푸시오
// 1. 2 + 3 = ?
printScreen(plus(2, 3));
// 2. 2 - 3 = ?
printScreen(minus(2, 3));
// 3. 2 * 3 = ?
printScreen(plus(2, 3));
// 4. 2 / 3 = ?
printScreen(div(2, 3));
// 5. 2 * 0 = ?
printScreen(multi(2, 0));
// 6. 2 / 0 = ?
printScreen(div(2, 0));
// 7. 6번 오류 해결
printScreen(div(2, 0));
