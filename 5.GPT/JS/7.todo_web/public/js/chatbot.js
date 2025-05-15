const todoList = document.getElementById("todo-list");
const input = document.getElementById("new-todo");
const addBtn = document.getElementById("add-todo");

// 버튼 클릭 시 추가 호출
addBtn.addEventListener("click", async () => {
  renderTodos();

  // 입력값 읽어다가 백엔드 호출 (/api/todos) POST
  const newTodo = input.value;
  console.log("추가 투두", newTodo);

  const res = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newTodo }),
  });

  const data = await res.json();
  console.log(data);

  const addTodo = document.createElement("li");
  addTodo.textContent = data.todo;
  todoList.appendChild(addTodo);
});

// 화면에 투두 리스트 가져와서 뿌리기 (렌더링)
async function renderTodos(todos) {
  // 백엔드에서 받아오기 (/api/todos) GET
  const res = await fetch("/api/todos");
  const data = await res.json();
  console.log("get요청: ", data);

  todoList.innerHTML = "";
  data.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "삭제";
    delBtn.className = "deleteBtn";

    li.appendChild(delBtn);
    todoList.appendChild(li);

    // 삭제
    delBtn.addEventListener("click", async () => {
      try {
        console.log("todo id:: ", todo.id);
        const res = await fetch(`/api/todos/${todo.id}`, {
          method: "DELETE",
        });
        const result = await res.json();
        console.log("삭제 결과:", result);

        if (result) {
          li.remove();
        }
      } catch (err) {
        console.error("삭제 실패:", err);
      }

      li.addEventListener("toggle", async () => {
        try {
          console.log("todo id:: ", todo.id);
          const res = await fetch(`/api/todos/${todo.id}`, {
            method: "PUT",
          });
          const result = await res.json();
          console.log("토글 결과:", result);

          if (result) {
          }
        } catch (err) {
          console.error("삭제 실패:", err);
        }
      });

      renderTodos();
    });
  });
}
renderTodos();
