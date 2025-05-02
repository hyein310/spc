// Add an event listener to the send button
document.getElementById("sendBtn").addEventListener("click", function () {
  let message = document.getElementById("questionInput").value;
  console.log("msg:: ", message);

  // Sending the message to the backend endpoint
  fetch("/api/send-message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data :: ", data);
      addChatMessage("User", data.questionMsg);
      addChatMessage("AI", data.aiResponse);
      document.getElementById("questionInput").value = "";
    })
    .catch((error) => console.error("Error:", error));
});

function addChatMessage(user, message) {
  const chatWindow = document.getElementById("chatContainer");
  const messageElement = document.createElement("div");

  messageElement.className = `${user}-message`;
  messageElement.innerText = `${user}: ${message}`;

  messageElement.style.padding = "10px";
  messageElement.style.margin = "5px";
  messageElement.style.borderRadius = "10px";
  messageElement.style.maxWidth = "60%";

  if (user === "User") {
    messageElement.style.alignSelf = "flex-end";
    messageElement.style.backgroundColor = "#dcf8c6";
  } else if (user === "AI") {
    messageElement.style.alignSelf = "flex-start";
    messageElement.style.backgroundColor = "#acf1c9";
  }

  messageElement.style.display = "inline-block";
  messageElement.style.clear = "both";

  chatWindow.appendChild(messageElement);
}
