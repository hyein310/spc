const express = require("express");
const path = require("path");

const PORT = 3000;
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));
// GET index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "main.html"));
});

// POST /api/memo
app.post("/api/memo", (req, res) => {
  const { inputTitle, inputContent } = req.body;
  console.log(`제목 : ${inputTitle}, 내용 : ${inputContent}`);

  res.json({ inputTitle: inputTitle, inputContent: inputContent });
});

// PUT /api/memo
app.put("/api/memo", (req, res) => {
  const { updateTitle, updateContent } = req.body;
  console.log(
    `업데이트 제목 : ${updateTitle}, 업데이트 내용 : ${updateContent}`
  );

  res.json({ updateTitle: updateTitle, updateContent: updateContent });
});

// DELETE /api/memo
app.delete("/api/memo", (req, res) => {
  res.status(201);
});

app.listen(PORT, () => {
  console.log("memo server is open!");
});
