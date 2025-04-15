const express = require("express");
const router = express.Router();

app.get("/", (req, res) => {
  res.send("안녕하세요. 메인입니다.");
});

module.exports = router;
