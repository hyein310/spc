document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const userTable = document.getElementById("userTable");

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
    userTable.innerHTML = "";

    fetch("/user")
      .then((res) => res.json())
      .then((data) => {
        console.log("data : ", data); // [{userId: 1, name: 'dd'}, {} ..]

        data.forEach((user) => {
          const row = document.createElement("div");
          row.innerHTML = `
          <strong>아이디 : </strong> ${user.userId}, 
          <strong>유저 이름 : </strong> ${user.name}
        `;

          row.appendChild(createBtn("수정", () => editUser(user.userId)));
          row.appendChild(createBtn("삭제", () => deleteUser(user.userId)));

          userTable.appendChild(row);
        });
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
    })
      .then((res) => {
        // 나머지 모든 부분에서도 이런식으로 에러처리를 해야 좋음.
        if (!res.ok) throw new Error("수정 실패");
        alert("수정 성공");
        updateTable();
      })
      .catch((error) => {
        alert("수정 중 오류 발생");
      });
  }

  function deleteUser(userId) {
    const confirmDelete = confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      fetch(`/user/${userId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("삭제 실패");
          updateTable();
          alert("삭제 성공");
        })
        .catch((error) => {
          console.error("삭제 중 오류 발생: ", error);
          alert("삭제 중 오류 발생");
        });
    } else {
      alert("장난치지 마시오...");
    }
  }
});
