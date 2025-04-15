const express = require("express");
const router = express.Router();

router.get("/profile", (req, res) => {
  res.send("사용자 프로필");
});

router.get("/setting", (req, res) => {
  res.send("사용자 설정");
});

module.exports = router;
