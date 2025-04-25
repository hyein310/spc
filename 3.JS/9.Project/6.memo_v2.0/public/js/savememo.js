document.addEventListener("DOMContentLoaded", () => {
  saveBtn();
  updateBtn();
});

// --- 버튼 ---
// 저장
function saveBtn() {
  document.getElementById("saveBtn").addEventListener("click", async () => {
    const inputTitle = document.getElementById("input-title");
    const inputContent = document.getElementById("input-content");
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    if (!inputTitle || !inputContent) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    await saveMemo(inputTitle.value, inputContent.value, file);

    alert("저장되었습니다. 😊");
    inputTitle.value = "";
    inputContent.value = "";
    fileInput.value = "";
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
    const updateImg = updateBox.querySelector(".update-img"); // input 타팁
    const checkImgDelete = updateBox.querySelector(".img-delete");

    console.log("업데이트 이미지 :: ", updateImg);
    console.log("체크 박스 불러오기 : ", checkImgDelete);

    // 수정 사항 서버에 전달
    updateSaveMemo(
      updateTitle,
      updateContent,
      updateImg,
      checkImgDelete,
      memoItem
    );
  });
}

// --- 메모장 ---
// 메모 저장 함수
async function saveMemo(inputTitle, inputContent) {
  const fileInput = document.getElementById("file-input");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("inputTitle", inputTitle);
  formData.append("inputContent", inputContent);
  if (file) {
    formData.append("file", file);
  }

  const res = await fetch("/api/memo", {
    method: "POST",
    body: formData,
  });

  const memo = await res.json();
  console.log("제목: ", memo.inputTitle);
  makeList(memo.inputTitle, memo.inputContent, memo.imageUrl);
}

// 메모장 리스트 추가 함수
function makeList(inputTitle, inputContent, imageUrl) {
  let memoId = 1;
  const memoBody = document.querySelector("#memo-list");
  const memo = document.createElement("div");
  memo.setAttribute("class", "memo-item");
  memo.setAttribute("data-id", `"${memoId}"`);

  let imgEle = "";
  if (imageUrl) {
    imgEle = `<img src="${imageUrl}" class="memo-image mb-2" style="max-width: 40%; height: auto;" />`;
  }

  memo.innerHTML = `
    <div class=memo-box>
      ${imgEle}
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
        <input type="file" class="update-img" accept=".jpg, .png" />
        <input type="checkbox" class="img-delete" /> 이미지 삭제
        <button class="updateSaveBtn btn btn-primary">저장</button>
    `;
  memoItem.appendChild(updateBox);

  updateSaveBtn(updateBox, memoItem);
}

// 수정 사항 서버에 업데이트 요청
// 일단 요청되지 않음.
async function updateSaveMemo(
  updateTitle,
  updateContent,
  updateImg,
  checkbox,
  memoItem
) {
  const prevImg = memoItem.querySelector(".memo-image"); // img 태그
  let updateImgUrl = null;

  console.log("이미지는 ? ", updateImg); // input type=file

  // 만약 checkbox 속성이 checked 면 이미지 삭제 동작
  // checkbox 속성이 unchecked이고, update를 하지 않았으면(수정하지 않았다. updateImg의 ) 이전 이미지(memoItem의 img) 그대로 전달,
  // updateImg의 값이 존재한다면 변경한 값 전달

  // updateImg값이 계속 null 만 출력됨.. 파일 선택해서 파일이 변경되었을 경우에, 이미지가 변경되어
  // 그 이미지 주소가 서버로 넘어가도록 하고싶음. 만약 주소를 얻을 수 없다면.. 이름이라도..

  console.log("pre:: ", prevImg);
  const prevSrc = prevImg ? prevImg.src.split(":3000")[1] : null;
  if (checkbox.checked) {
    // if (prevImg) {
    //   prevImg.remove();
    // }
    updateImgUrl = null;
  } else {
    const file = updateImg.files[0]; // 새로 선택된 파일

    if (file) {
      const formData = new FormData();
      formData.append("file", file); // formData.append(key, vaule)

      const uploadRes = await fetch("/api/memo", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      updateImgUrl = uploadData.imageUrl;
      console.log("new file: ", updateImgUrl);
    } else {
      updateImgUrl = prevSrc;
    }
  }

  // console.log("수정 후 이미지는 ? ", updateImg);
  // updateImgUrl = updateImg.src;
  console.log("수정 후 이미지 주소: ", updateImgUrl);
  // PUT
  const res = await fetch("/api/memo", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      updateTitle,
      updateContent,
      updateImgUrl,
      prevImgUrl: prevSrc,
    }),
  });

  // 해결해야 할 것
  // res로 수정된 값을 memo-box의 div memo-title, div memo-content에 각각 p.innerText로 저장해서 업데이트 한 후,
  // 현재 보이는 updateBox의 값을 display: none 스타일로 바꿔놓고, memo-box의 display: block으로 바꿔준다.
  const memo = await res.json();
  console.log("수정 완료 메모: ", memo);

  // memo-box의 요소 가져오기
  const titleElem = memoItem.querySelector(".memo-title");
  const contentElem = memoItem.querySelector(".memo-content");
  // const imgElem = memoItem.querySelector(".memo-image");
  const updateBox = memoItem.querySelector(".updateBox");
  const memoBox = memoItem.querySelector(".memo-box");

  // memo-box의 value 내용 업데이트
  titleElem.innerText = memo.updateTitle;
  contentElem.innerText = memo.updateContent;

  if (memo.updateImgUrl == null) {
    prevImg.remove();
  } else {
    if (prevImg) {
      prevImg.src = memo.updateImgUrl;
    } else {
      const newImg = document.createElement("img");
      newImg.className = "memo-image";
      newImg.src = memo.updateImgUrl;
      memoBox.appendChild(newImg);
    }
  }

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

// 파일 선택
function fileChoice() {
  const fileInput = document.getElementById("file-input");
  fileInput.addEventListener("change", (e) => {
    const selectFile = e.target.files;
    console.log("e:: ", e.target);
    console.log("selectfile ::", selectFile);

    if (selectFile.length > 0) {
      for (const file of selectFile) {
        console.log("파일 이름:", file.name);
        console.log("파일 크기:", file.size);
        console.log("파일 유형:", file.type);
      }
    }
  });
}
