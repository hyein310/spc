const tweetBtn = document.getElementById("tweetBtn");

tweetBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("버튼 클릭");
  const content = document.getElementById("content").value;

  if (!content.trim()) {
    alert("내용을 입력하세요.");
    return;
  }

  const res = fetch("/api/tweet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  const data = await res.json();

  if (res.ok) {
    showFlash("트윗 작성 완료!", "success");
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000); // 1초 있다가 메인 페이지로 이동
  } else {
    showFlash(data.msg, "danger");
    setTimeout(() => {
      window.location.href = "/login.html";
    }, 1000); // 1초 있다가 다시 로그인 페이지로 이동
  }
});
