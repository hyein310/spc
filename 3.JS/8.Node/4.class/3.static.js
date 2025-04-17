class mathOps {
  static add(a, b) {
    return a + b;
  }

  static sub(a, b) {
    return a - b;
  }
}

// const myMathOps = new mathOps();
// const result = myMathOps.add(3, 4);
// console.log(result); -> static 변수는 객체 생성은 가능하지만, 출력할 수 없음

// 객체를 이렇게 찍어내지 않고, 수학 연산을 위한 객체를 만든거라 공통함수 제공이 목적임
const sum = mathOps.add(2, 3);
console.log(sum);
