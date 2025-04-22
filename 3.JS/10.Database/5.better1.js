const sqlite = require("better-sqlite3"); // 동기로 동작할 수 있게 하는 라이브러리, 따로 promise로 처리하지 않아도 됨

const db = sqlite("test.db");

// 1. 테이블 생성
db.exec(
  "CREATE TABLE IF NOT EXISTS greetings (id INTEGER PRIMARY KEY AUTOINCREMENT, messages Text)"
);

// 2. 데이터 삽입
const insert = db.prepare("INSERT INTO greetings (messages) VALUES (?)");
insert.run("Hello, Better SQLite3");

// 3. 데이터 조회
const select = db.prepare("SELECT * FROM greetings");
const greetings = select.all();

// 4.
greetings.forEach((row) => {
  console.log(`인사 ${row.id}: ${row.message}`);
});
