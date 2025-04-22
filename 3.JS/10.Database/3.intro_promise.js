const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("test.db");

// 익명함수 만들고 호출까지
(async () => {
  await new Promise((resolve, reject) => {
    // pending, fulfiled, rejected
    db.run("CREATE TABLE IF NOT EXISTS messages (text TEXT)", (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
  console.log("hello");
})();
