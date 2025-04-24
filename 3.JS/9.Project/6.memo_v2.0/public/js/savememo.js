document.addEventListener("DOMContentLoaded", () => {
  saveBtn();
  updateBtn();
});

// --- 버튼 ---
// 저장
function saveBtn() {
  document.getElementById("saveBtn").addEventListener("click", () => {
    const inputTitle = document.getElementById("input-title");
    const inputContent = document.getElementById("input-content");

    saveMemo(inputTitle.value, inputContent.value);
    alert("저장되었습니다. 😊");
    inputTitle.value = "";
    inputContent.value = "";
  });
}

// 수정 & 삭제
function updateBtn() {
  document.addEventListener("click", (e) => {
    if (e.target.matches(".updateBtn")) {
      const memoItem = e.target.closest(".memo-item"); // 가장 가까운 부모 중 .memo-item 찾기
      if (!memoItem) return;
      console.log("click", memoItem);
      //   const itemId = memoItem.getAttribute("data-id"); // 부모의 data-id를 읽기
      //   console.log("click!", e.target, "itemId:", itemId);
      updateMemo(memoItem);
    } else if (e.target.matches(".deleteBtn")) {
      const memoItem = e.target.closest(".memo-item");
      if (!memoItem) return;
      console.log("click del: ", memoItem);
      deleteMemo(memoItem);
    }
  });
}

// 수정사항 저장
function updateSaveBtn(updateBox, memoItem) {
  document.querySelector(".updateSaveBtn").addEventListener("click", () => {
    const updateTitle = updateBox.querySelector(".memo-update-title").value;
    const updateContent = updateBox.querySelector(".memo-update-content").value;

    console.log("수정 완료 버튼 누른 후 값 :: ", updateTitle);
    // 수정 사항 서버에 전달
    updateSaveMemo(updateTitle, updateContent, memoItem);
  });
}

// --- 메모장 ---
// 메모 저장 함수
async function saveMemo(inputTitle, inputContent) {
  const res = await fetch("/api/memo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputTitle, inputContent }),
  });

  const memo = await res.json();
  console.log("제목: ", memo.inputTitle);
  makeList(memo.inputTitle, memo.inputContent);
}

// 메모장 리스트 추가 함수
function makeList(inputTitle, inputContent) {
  let memoId = 1;
  const memoBody = document.querySelector("#memo-list");
  const memo = document.createElement("div");
  memo.setAttribute("class", "memo-item");
  memo.setAttribute("data-id", `"${memoId}"`);
  memo.innerHTML = `
    <div class=memo-box>
        <p class="memo-title">${inputTitle}</p>
        <p class="memo-content">${inputContent}</p>
        <button class="updateBtn btn btn-info">수정</button>
        <button class="deleteBtn btn btn-warning">삭제</button>
    </div>
    `;
  memoBody.appendChild(memo);
  memoId++;
}

// --- 메모 수정 ---
// 수정 (버튼 클릭 시 수행)
function updateMemo(memoItem) {
  // memo-item class중에 data-id의 value가 itemId와 같은 것을 찾은 후
  // 수정 버튼 누르면 p태그가 input태그로 바뀌어야함
  // 바뀌는 것은 힘들다.. 버튼 누르면 p태그 안보이고 input태그가 보이도록.

  const memoBox = memoItem.querySelector(".memo-box");
  const inputTitle = memoItem.querySelector(".memo-title").innerText;
  const inputContent = memoItem.querySelector(".memo-content").innerText;

  console.log("item: ", memoBox);
  console.log("inputTitle: ", inputTitle);
  memoBox.setAttribute("style", "display: none");
  const updateBox = document.createElement("div");
  updateBox.setAttribute("class", "updateBox");
  updateBox.innerHTML = `
        <input type="text" class="memo-update-title" value="${inputTitle}" />
        <input type="text" class="memo-update-content" value="${inputContent}" />
        <button class="updateSaveBtn btn btn-primary">저장</button>
    `;
  memoItem.appendChild(updateBox);

  updateSaveBtn(updateBox, memoItem);
}

// 수정 사항 서버에 업데이트 요청
// 일단 요청되지 않음.
async function updateSaveMemo(updateTitle, updateContent, memoItem) {
  // PUT
  const res = await fetch("/api/memo", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updateTitle, updateContent }),
  });

  // 해결해야 할 것
  // res로 수정된 값을 memo-box의 div memo-title, div memo-content에 각각 p.innerText로 저장해서 업데이트 한 후,
  // 현재 보이는 updateBox의 값을 display: none 스타일로 바꿔놓고, memo-box의 display: block으로 바꿔준다.
  const memo = await res.json();
  console.log("수정 완료 메모: ", memo);

  // memo-box의 요소 가져오기
  const titleElem = memoItem.querySelector(".memo-title");
  const contentElem = memoItem.querySelector(".memo-content");
  const updateBox = memoItem.querySelector(".updateBox");
  const memoBox = memoItem.querySelector(".memo-box");

  // memo-box의 value 내용 업데이트
  titleElem.innerText = memo.updateTitle;
  contentElem.innerText = memo.updateContent;

  // display 전환
  updateBox.remove(); // DOM에서 제거
  memoBox.style.display = "block";
  alert("수정 완료! 😊");
}

// 삭제 수행
async function deleteMemo(memoItem) {
  alert("삭제 성공 😊");
  memoItem.remove();
}
