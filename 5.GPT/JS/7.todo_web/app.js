const express = require("express");
const morgan = require("morgan");
const path = require("path");
const todoRoute = require("./routes/todoRoute")

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

// Route
app.use(todoRoute);

app.listen(PORT, () => {
  console.log("server is open!");
  console.log(`http://localhost:${PORT}`);
});
