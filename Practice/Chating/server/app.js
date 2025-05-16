const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const PORT = 8080;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "client", "chatting.html"));
});

const nickInfo = {};
io.on("connection", (socket) => {
  // 닉네임 체크
  socket.on("checkNick", (nickname) => {
    console.log(nickInfo);
    if (Object.values(nickInfo).indexOf(nickname) > -1) {
      socket.emit("error", "이미 존재하는 닉네임입니다.");
    } else {
      nickInfo[socket.id] = nickname;
      socket.emit("entrySuccess", nickname);
      socket.broadcast.emit("notice", `${nickname}님이 입장하셨습니다.`);

      io.emit("updateNicks", nickInfo);
    }
  });

  // 채팅
  socket.on("send", (msgData) => {
    // 모두에게 보내기
    if (msgData.dm == "all") {
      io.emit("message", { id: msgData.myNick, message: msgData.msg });
    } else {
      // 특정 아이디의 사람에게만 보내기 (나 포함하지 않음)
      io.to(msgData.dm).emit("message", {
        id: msgData.myNick,
        message: msgData.msg,
        isDm: true,
      });

      // 나에게만 보내기
      socket.emit("message", {
        id: msgData.myNick,
        message: msgData.msg,
        isDm: true,
      });
    }
  });
  socket.on("disconnect", () => {
    console.log(nickInfo[socket.id]);
    io.emit("updateNicks", nickInfo);
    io.emit("notice", `${nickInfo[socket.id]}님이 퇴장하셨습니다..`);
    delete nickInfo[socket.id];
  });
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
