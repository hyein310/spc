const chatbotIcon = document.getElementById("chatbotIcon");
const chatboWindow = document.getElementById("chatbotWindow");
const closeChatbot = document.getElementById("closeChatbot");
const sendMsg = document.getElementById("sendMessage");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotView = document.getElementById("chatbotView");
const chatbotMessages = document.getElementById("chatbotMessages");
const userMessages = document.getElementById("userMessages");
// send 버튼을 통해서 백엔드로 입력한 대화 내용 전송
//  받아온 응답을 대화창에 출력

chatbotIcon.addEventListener("click", () => {
  chatboWindow.style.display = "block";
  chatbotIcon.style.display = "flex";
});

closeChatbot.addEventListener("click", () => {
  chatboWindow.style.display = "none";
  chatbotIcon.style.display = "flex";
});

function messageTrans() {
  const question = chatbotInput.value;
  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const chat = document.createElement("div");
      chat.textContent = `echo: ${data.question}`;
      chatbotMessages.appendChild(chat);
    });

  chatbotInput.value = "";
}

sendMsg.addEventListener("click", () => {
  const question = chatbotInput.value;
  const userchat = document.createElement("div");
  userchat.textContent = `나: ${question}`;
  console.log("usermsg : ", userMessages);
  userMessages.appendChild(userchat);

  messageTrans();
});

chatbotInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const question = chatbotInput.value;
    const userchat = document.createElement("div");
    userchat.textContent = `나: ${question}`;
    userMessages.appendChild(userchat);
    messageTrans();
  } else return;
});
