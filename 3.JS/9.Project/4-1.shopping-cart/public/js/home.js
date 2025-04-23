document.addEventListener("DOMContentLoaded", () => {
  // 로그인 한적이 있을까? 물어보기...
  checkLoginStatus();
  document.getElementById("login").addEventListener("click", (e) => {
    e.preventDefault();
    login();
  });
  document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
});

// 로그인 확인
async function checkLoginStatus() {
  const response = await fetch("/api/check-login");
  if (response.status === 200) {
    const data = await response.json();
    showProfile(data.username);
  } else {
    const data = await response.json();
    console.log(data);
    showLoginForm();
  }
}

// 로그인
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.status === 200) {
    // 로그인 성공
    const data = await response.json();
    // console.log(data);
    showProfile(data.username);
  } else {
    // 로그인 실패
  }
}

async function logout() {
  const res = await fetch("/api/logout");
  console.log("로그아웃 완료:: ", res.json());
  showLoginForm();
}

// 유저 프로필
function showProfile(username) {
  document.getElementById("usernameSpan").textContent = username;
  document.getElementById("profile").style.display = "block";
  document.getElementById("loginFormContainer").style.display = "none";
}

// 로그인 폼
function showLoginForm() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";

  document.getElementById("profile").style.display = "none";
  document.getElementById("loginFormContainer").style.display = "block";
}
