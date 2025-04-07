function showHide() {
  // 미션1. 이 요소를 숨기기 (버튼 다시 누르면 보이기) 힌트: diplay: none;

  let myDiv = document.getElementById("showHide");
  if (myDiv.style.visibility == "visible") {
    myDiv.style.visibility = "hidden";
  } else myDiv.style.visibility = "visible";
}
