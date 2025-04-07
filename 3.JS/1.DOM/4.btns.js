function increment() {
  var result = document.getElementById("result");
  result.innerText = Number(result.innerText) + 1;
  console.log("증가 버튼 클릭", result);
}

function decrement() {
  var result = document.getElementById("result");
  // result.innerText = parseInt(result.innerText) - 1;
  //   console.log("감소 버튼 클릭");

  // 숙제1. 감소할 때, 0이하로 안내려가게 만들기
  var resultValue = parseInt(result.innerText) - 1;
  result.innerText = parseInt(result.innerText) - 1;

  console.log("resultV : ", resultValue);
  if (resultValue < 0) {
    result.innerText = resultValue - resultValue;
  }
}
