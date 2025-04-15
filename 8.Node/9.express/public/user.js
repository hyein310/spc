document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const userTable = document.getElementById("userTable");

  updateTable();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = username.value;
    console.log("생성할 이름 : ", name);

    fetch("/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    username.value = "";
    updateTable();
  });

  function updateTable() {
    // userTable.innerHTML = ""; // 이전 내용 삭제

    fetch("/user")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("data userid : ", data.userId);

        const row = document.createElement("div");
        row.innerHTML = `
            <strong>아이디 : </strong> ${data.userId}, 
            <strong>유저 이름 : </strong> ${data.name}`;

        row.appendChild(
          createBtn("수정", () => {
            editUser(data.userId);
          })
        );
        row.appendChild(
          createBtn("삭제", () => {
            deleteUser(data.userId);
          })
        );
        userTable.appendChild(row);
      });
  }

  function createBtn(text, handler) {
    const Btn = document.createElement("button");
    Btn.textContent = text;
    Btn.addEventListener("click", handler);
    return Btn;
  }

  function editUser(userId) {
    const newName = prompt("수정할 이름을 입력하세요.");
    fetch(`/user/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, newName }),
    });
    updateTable();
  }

  function deleteUser(userId) {
    fetch(`/user/${userId}`, {
      method: "DELETE",
    });
    updateTable();
  }
  // 미션1. 입력이 끝났으면 입력 칸 클리어
  // 미션2. 입력이 끝났으면 서버에 정보 요청해서 화면에 표시
});
