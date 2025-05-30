const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("test.db");

// 아래 모든 라인이 비동기로 실행됨을 인지해야 함. 매우 큰 주의사항!!
// 코드를 짠 순서가 아닌 마음대로 수행 가능
// run은 실행만 하고 결과를 받아 올 수 없음
db.run("CREATE TABLE IF NOT EXISTS messages (text TEXT)");
db.run("INSERT INTO messages (text) VALUES (?)", ["Hello, SQLite!"]); // Prepared Statement (가변 인자를 (?)로 놓아둠)
// DB의 SQL Injection 취약점을 해결하기 위해 어전의 SQL Injection을 통해서 우리의 쿼리문을 이스케이핑하지 못하도록 위와 같은 문법 출현 -> 시큐어코딩 가이드 참고

// each 는 실행 결과를 받아올 수 있음
db.each("SELECT * FROM messages", (err, row) => {
  console.log(row.text);
});

db.close();
