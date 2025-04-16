const myContainer = document.getElementById("scroll-container");
const NUM_OF_ITEMS_PAGE = 10;
const MAX_ITEMS = 20;
const TOTAL_ITEMS = 200;

let start = 0;
let end = start + NUM_OF_ITEMS_PAGE;

document.addEventListener("DOMContentLoaded", () => {
  loading();
});

async function loading() {
  if (start >= TOTAL_ITEMS) {
    return;
  }

  const res = await fetch(`/get-items?start=${start}&end=${end}`);
  const itemInfo = await res.json();

  itemInfo.forEach((info) => {
    const item = document.createElement("div");
    item.textContent = info;
    item.classList.add("item");
    myContainer.appendChild(item);
  });
  // 다음 로딩 준비
  start = end;
  end += NUM_OF_ITEMS_PAGE;

  // 배열의 끝까지 내려간다면 더 이상 내려가지 않도록 해야함

  // 오래된 돔을 찾아서 위에 지우기
  // 스크롤의 위치가 윈도우 높이의 최상단까지 갔을 때 지운 돔을 새로 불러 오도록 해야함
}

window.addEventListener("scroll", () => {
  // console.log("윈도우 높이 : ", window.innerHeight);
  // console.log("스크롤바 위치 : ", window.scrollY);
  const scrollBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight;

  const scrollTop = window.scrollY === 0;

  if (scrollBottom) {
    loading(TOTAL_ITEMS);
  } else if (scrollTop) {
    loading(TOTAL_ITEMS);
  }
});
