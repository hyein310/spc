async function logout() {
  const res = await fetch("/api/logout", { method: "POST" });
  const msg = await res.json();
  console.log(msg);

  if (res.ok) {
    alert(msg.msg);
  } else {
    alert(msg.msg);
  }
  window.location.href = "/index.html";
}

function showFlash(msg, type = "success") {
  const flashDiv = document.getElementById("flash-msg");
  flashDiv.innerHTML = `
      <li class=${type}>${msg}</li>`;
}
