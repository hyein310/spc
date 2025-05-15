const { db } = require("../models/database");

function getAllTodos(req, res) {
    const rows= db.prepare("SELECT * FROM todos").all();
    res.json(rows)
    
}
function addTodo(req, res) {
    const {newTodo} = req.body;
    console.log("추가 투두: ", newTodo)

    const stmt= db.prepare("INSERT INTO todos(text) VALUES (?)");
    const info = stmt.run(newTodo);

    console.log("info: ", info)
    res.json({"msg": "success", "todo": newTodo})

}

function toggleTodo(req, res) {

}

function deleteTodo(req ,res) {
    const {id} = req.params;
    const stmt = db.prepare("DELETE FROM todos WHERE id = ?");
    const info = stmt.run(id);
    console.log("delete 완료: ", id)
    res.json({msg: "success", deletedCount: info.changes})
}

module.exports = {
    getAllTodos,
    addTodo,
    toggleTodo,
    deleteTodo
}
