const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.render("userCRUD.js");
});
app.listen(PORT, () => {
  console.log("server is open~~");
});
