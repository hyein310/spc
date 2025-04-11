const ROWS = 5;

function leftTriangle() {
  let currentRow = 1;
  while (currentRow <= ROWS) {
    let stars = "";
    let startCnt = 1;
    while (startCnt <= currentRow) {
      stars += "*";
      startCnt++;
    }
    console.log(stars);
    currentRow++;
  }
}

leftTriangle();
