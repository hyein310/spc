const form = document.getElementById("exampleForm");
const resultDiv = document.getElementById("result");

const userId = document.getElementById("id");
const userIdError = document.getElementById("id-error");
const password = document.getElementById("password");
const passwordError = document.getElementById("password-error");
const nameValue = document.getElementById("name");
const nameError = document.getElementById("name-error");

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

// 사용자명 유효성 검사
userId.addEventListener("blur", function () {
  if (
    userId.value === "" ||
    parseInt(userId.value.length) < 3 ||
    parseInt(userId.value.length) > 11
  ) {
    userId.classList.add("is-invalid");
    userIdError.innerText =
      "사용자명은 3글자 이상 10글자 이하로 입력해야합니다.";
  } else {
    userId.classList.remove("is-invalid");
    userIdError.innerText = "";
  }
});

// 비밀번호 유효성 검사
password.addEventListener("blur", function () {
  if (password.value === "") {
    password.classList.add("is-invalid");
    passwordError.innerText = "비밀번호 공백은 안됩니다.";
  } else if (!PASSWORD_REGEX.test(password.value)) {
    password.classList.add("is-invalid");
    passwordError.innerText =
      "비밀번호는 대소문자, 숫자, 특수문자 중 3가지 이상을 포함하고 8자 이상이어야 합니다.";
  } else {
    password.classList.remove("is-invalid");
    passwordError.innerText = "";
  }
});

nameValue.addEventListener("blur", function () {
  if (
    nameValue.value === "" ||
    parseInt(nameValue.value.length) < 1 ||
    parseInt(nameValue.value.length) > 10
  ) {
    nameValue.classList.add("is-invalid");
    nameError.innerText = "이름은 1~10글자로 입력해야 합니다.";
  } else {
    nameValue.classList.remove("is-invalid");
    nameError.innerText = "";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault(); // 서버로 전송하는 기본 기능 작동 막기

  // 폼 데이터 가져 오기
  // 위에 폼을 객체에 넣고, get 함수를 통해서 필드 내용 가져오기
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // 결과 출력
  resultDiv.innerHTML = `<div class="alert alert-success">
        <h5>폼 데이터 제출 완료!</h5>
        <p><strong>이름: </strong>${name}</p>
        <p><strong>이메일: </strong>${email}</p>
        <p><strong>비밀번호: </strong>${password}</p>
     </div>`;
});

// 체크 박스 개수 제한
// const interests = document.getElementsByName("interest");
// for (let i = 0; i < interests.length; i++) {
//   interests[i].addEventListener("click", check);
// }

// function check() {
//   let checkCnt = 0;

//   for (let i = 0; i < interests.length; i++) {
//     if (interests[i].checked) {
//       checkCnt++;
//     }
//   }
//   if (checkCnt > 4 || checkCnt < 0) {
//     alert("최소 1개, 최대 3개 선택 가능합니다.");
//     this.checked = false;
//   }
// }
