const GAME_SPEED = 200; // ms 화면 갱신 주기
const BLOCK_SIZE = 20; // 블록 크기

let snake = { x: 0, y: 0 };

// DOM 과 각종 필요한 컴포넌트 로딩 이후 실행
window.onload = initialize;

function initialize() {
  canvas = document.getElementById("snakeCanvas");
  context = canvas.getContext("2d");

  // 키 이벤트 리스너 추가
  setupEventListener();

  // 게임 시작 루프 호출
  setInterval(gameLoop, GAME_SPEED);
}

function gameLoop() {
  // 뱀 이동
  moveSnake();

  // 화면 렌더링
  draw();
}

// 화면에 뱀 그리기
function draw() {
  context.clearRect(0, 0, canvas.window, canvas.height);

  context.fillStyle = "blue";
  context.fillRect(0, 0, BLOCK_SIZE, BLOCK_SIZE);
}

// 뱀 위치 이동
function moveSnake() {
  snake.x += BLOCK_SIZE;
  // snake.y += BLOCK_SIZE;

  // 화면을 벗어나지 않게 오른쪽 끝 -> 왼쪽 끝에서 나오기 (vice versa)
}

// 키보드 이벤트 핸들러
function setupEventListener() {
  // document.addEventListener("keydown", ...);
}
