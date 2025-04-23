const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");

const users = [
  { username: "user1", password: "1234" },
  { username: "user2", password: "5678" },
  { username: "user3", password: "0000" },
];
const db = new sqlite3.Database("user.db");

async function insertUsers() {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    db.run(
      `INSERT INTO users(username, password) VALUES (?,?)`,
      [user.username, hashedPassword],
      (err) => {
        console.log(`등록 성공.. ${user.username}, ${hashedPassword}`);
      }
    );
  }
}

insertUsers();
