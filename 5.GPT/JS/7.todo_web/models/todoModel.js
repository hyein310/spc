const { db } = require("../models/database");

function getAllTodos() {
  const rows = db.prepare("SELECT * FROM todos").all();
  // 필요시 rows를 내가 원하는 json값으로 변환
  return rows;
}

function addTodo(req, res) {
  const { text } = req.body;
  return db.prepare("INSERT INTO todos(text) VALUES (?)").run(text);
}

function toggleTodo(req, res) {
  const id = req.params.id;

  // 현재 상태가져오기
  const row = db.prepare("SELECT * FROM todos WHERE id=?").get(id);
  const newState = row.completed ? 0 : 1;

  // 반전해서 저장하기
  const stmt = "UPDATE todos SET completed=? WHERE id=?";
  db.prepare(stmt).run(newState, id);

  res.json({ message: "ok" });
}

function deleteTodo(req, res) {
  const id = req.params.id;

  db.prepare("DELETE FROM todos WHERE id=?").run(id);
  res.json({ message: "ok" });
}

module.exports = {
  getAllTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
};
