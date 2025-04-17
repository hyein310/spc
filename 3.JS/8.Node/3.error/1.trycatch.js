try {
  const result = someVariableName * 2;
} catch (error) {
  // 발생하는 모든 오류를 퉁쳐서 잡음
  console.error("오류 발생 : ", error.message);
}

console.log("진행 중..");

// 참조 오류 발생
try {
  const result = someVariableName * 2;
} catch (error) {
  if (error instanceof ReferenceError) {
    console.log("참조 오류 발생: ", error.message);
  } else {
    console.log("그 외 다른 오류 발생: ", error.message);
  }
}

// 문법 오류 발생
try {
  // 일부러 따옴표 빠트림
  eval("alert('Hello)");
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log("문법 오류 발생: ", error.message);
  } else {
    console.log("그 외 다른 오류 발생: ", error.message);
  }
}

// 범위 오류 발생
try {
  let arr = new Array(-1); // 배열은 길이가 양수여야 한다
} catch (error) {
  if (error instanceof RangeError) {
    console.log("범위 오류 발생: ", error.message);
  } else {
    console.log("그 외 다른 오류 발생: ", error.message);
  }
}

// 에러 만들기
// 이 함수만 실행시 에러 때문에 실행 안됨
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("숫자를 입력하세요.");
  }

  // 입력한 숫자가 2자리까지만 입력
  if (a.toString().length > 2 || b.toString().length > 2) {
    throw new RangeError("2자리 이상 숫자를 입력하세요.");
  }
  if (b === 0) {
    throw new Error("0으로 나눌 수 없습니다.");
  }
  return a / b;
}

// 에러 만들지만 정지하지 않고 메세지 보내기
try {
  result = divide(5, 0);
} catch (error) {
  console.log("오류 발생: ", error.message);
}
