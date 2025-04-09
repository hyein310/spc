const GAME_SPEED = 200; // ms 화면 갱신 주기
const BLOCK_SIZE = 20; // 블록 크기
const CONTAINER = 300;

let snake = { x: 0, y: 0, directionX: 0, directionY: 0 };
let apple = getRandomApple();

// DOM 과 각종 필요한 컴포넌트 로딩 이후 실행
window.onload = initialize;

// ==== 시작 세팅 ====
function initialize() {
  canvas = document.getElementById("snakeCanvas");
  context = canvas.getContext("2d");
  // 키 이벤트 리스너 추가
  setupEventListener();
  // 게임 시작 루프 호출
  setInterval(gameLoop, GAME_SPEED);
}

// ==== 화면에 뱀 그리기 ====
function drawSnake() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.moveTo(snake.x, snake.y);
  context.fillStyle = "blue";
  context.fillRect(snake.x, snake.y, BLOCK_SIZE, BLOCK_SIZE);
  context.closePath();

  // 사과 그리기
  context.beginPath();
  context.moveTo(apple.x, apple.y);
  context.fillStyle = "red";
  context.fillRect(apple.x, apple.y, BLOCK_SIZE, BLOCK_SIZE);
  context.closePath();
}

// ==== 뱀 위치 이동 ====
// 화면을 벗어나지 않게 오른쪽 끝 -> 왼쪽 끝에서 나오기 (vice versa)
function moveSnake() {
  if (snake.directionX === 0 && snake.directionY === 0) {
    return;
  }
  snake.x += snake.directionX;
  snake.y += snake.directionY;

  if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  if (snake.y >= canvas.height) {
    snake.y = 0;
  }
  if (snake.x < 0) {
    snake.x = canvas.width - BLOCK_SIZE;
  }
  if (snake.y < 0) {
    snake.y = canvas.height - BLOCK_SIZE;
  }
}

// ==== 키보드 이벤트 ====
function handleKeyDown(e) {
  switch (e.key) {
    case "ArrowLeft":
      snake.directionX = -BLOCK_SIZE;
      snake.directionY = 0;
      break;
    case "ArrowRight":
      snake.directionX = BLOCK_SIZE;
      snake.directionY = 0;
      break;
    case "ArrowUp":
      snake.directionY = -BLOCK_SIZE;
      snake.directionX = 0;
      break;
    case "ArrowDown":
      snake.directionY = BLOCK_SIZE;
      snake.directionX = 0;
      break;
    case "Enter":
      snake.directionX = 0;
      snake.directionY = 0;
    default:
      break;
  }
}

// 사과 랜덤 배치
function getRandomApple() {
  const maxBlocks = CONTAINER / BLOCK_SIZE;
  const x = Math.floor(Math.random() * maxBlocks) * BLOCK_SIZE;
  const y = Math.floor(Math.random() * maxBlocks) * BLOCK_SIZE;
  return { x, y };
}

function checkApple() {
  if (snake.x === apple.x && snake.y === apple.y) {
    apple = getRandomApple();
  }
}

// ==== 실행 ====
function gameLoop() {
  // 뱀 이동
  moveSnake();
  // 뱀 화면 렌더링
  drawSnake();
  checkApple();
}

// 키보드 이벤트 핸들러
function setupEventListener() {
  document.addEventListener("keydown", handleKeyDown);
}
