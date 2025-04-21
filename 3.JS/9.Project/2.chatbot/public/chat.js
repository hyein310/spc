const chatbotIcon = document.getElementById("chatbotIcon");
const chatboWindow = document.getElementById("chatbotWindow");
const closeChatbot = document.getElementById("closeChatbot");
const sendMsg = document.getElementById("sendMessage");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotView = document.getElementById("chatbotView");
const chatbotMessages = document.getElementById("chatbotMessages");
const userMessages = document.getElementById("userMessages");

const API_SERVER = "http://127.0.0.1:5000";
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

sendMsg.addEventListener("click", () => {
  myMsg();
  messageTrans();
});

chatbotInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    myMsg();
    messageTrans();
  } else return;
});

function messageTrans() {
  const question = chatbotInput.value;
  fetch(`${API_SERVER}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // credentials: "include",
    body: JSON.stringify({ question }),
  })
    .then((res) => res.json())
    .then((data) => {
      const chat = document.createElement("div");
      const icon = document.createElement("i");
      const msg = document.createElement("span");

      console.log(data);
      icon.className = "bi bi-robot";
      chat.className = "chatbot-messages";
      msg.textContent = `Echo: ${data.question}`;

      chat.appendChild(icon);
      chat.appendChild(msg);
      chatbotView.appendChild(chat);
      chatbotView.scrollTo({
        top: chatbotView.scrollHeight,
        behavior: "smooth",
      });
    });

  chatbotInput.value = "";
}

function myMsg() {
  const question = chatbotInput.value;
  const userchat = document.createElement("div");
  const icon = document.createElement("i");
  const msg = document.createElement("span");

  if (!question.trim()) return;

  icon.className = "bi bi-person";
  userchat.className = "user-messages";
  msg.textContent = `나: ${question}`;

  userchat.appendChild(icon);
  userchat.appendChild(msg);
  chatbotView.appendChild(userchat);
  chatbotView.scrollTo({
    top: chatbotView.scrollHeight,
    behavior: "smooth",
  });
}
