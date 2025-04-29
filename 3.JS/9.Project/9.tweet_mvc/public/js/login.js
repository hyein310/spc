const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log("email: ", email);

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    // res.status_code 가 200인 것을 비교하거나 res.ok가 true/false 인것을 비교하거나
    const msg = await res.json();
    showFlash(msg.msg, "success");
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000); // 1초 있다가 메인페이지로 이동
  } else {
    const err = await res.json();
    showFlash(err.msg, "danger");
    setTimeout(() => {
      window.location.href = "/login.html";
    }, 1000);
  }
});
