const ROWS = 5;

function leftTrianlge() {
  for (let i = 0; i < 5; i++) {
    for (let j = 1; j <= i + 1; j++) {
      // 줄 바꿈 없이 출력
      process.stdout.write("*");
    }
    process.stdout.write("\n");
  }
  console.log("\n");
}

function leftTrianlge2() {
  for (let r = 1; r <= ROWS; r++) {
    let stars = "";
    for (let c = 1; c <= r; c++) {
      stars += "*";
    }
    console.log(stars);
  }
}

// 함수의 인자를 받으면서 기본값 설정
// 함수의 호출자(caller)에게 인자값을 설정하게 해주고 안했을 경우 내가 정한 default value 를 통해 적용
function leftTrianlge3(rows = ROWS) {
  for (let r = 1; r <= rows; r++) {
    console.log("*".repeat(r));
  }
}

function leftIntervertTriangle() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j <= 4 - i; j++) {
      process.stdout.write("*");
    }
    process.stdout.write("\n");
  }
  console.log("\n");
}

function rigthTriangle() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4 - i; j++) {
      process.stdout.write(" ");
    }
    for (let k = 1; k <= i + 1; k++) {
      process.stdout.write("*");
    }
    process.stdout.write("\n");
  }
  console.log("\n");
}

function rigthTriangle2(rows = ROWS) {
  for (let r = 1; r <= rows; r++) {
    console.log(" ".repeat(rows - r) + "*".repeat(r));
  }
}

function rigthIntervertTriangle() {
  for (let i = 0; i < 5; i++) {
    for (let k = 1; k < i + 1; k++) {
      process.stdout.write(" ");
    }
    for (let j = 0; j <= 4 - i; j++) {
      process.stdout.write("*");
    }

    process.stdout.write("\n");
  }
  console.log("\n");
}

function doublesideTrianlge() {
  let cnt = 1;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4 - i; j++) {
      process.stdout.write(" ");
    }
    for (let k = 0; k < i * 2 + 1; k++) {
      process.stdout.write("*");
    }
    process.stdout.write("\n");
  }
  console.log("\n");
}

function doublesideIntervertTrianlge() {
  for (let i = 0; i < 5; i++) {
    for (let k = 1; k < i + 1; k++) {
      process.stdout.write(" ");
    }
    for (let j = 0; j < 9 - i * 2; j++) {
      process.stdout.write("*");
    }

    process.stdout.write("\n");
  }
  console.log("\n");
}

leftTrianlge();
leftIntervertTriangle();
rigthTriangle();
rigthIntervertTriangle();
doublesideTrianlge();
doublesideIntervertTrianlge();

leftTrianlge2();
leftTrianlge3();
rigthTriangle2();
