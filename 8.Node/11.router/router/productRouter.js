const express = require("express");
const router = express.Router();

router.get("/list", (req, res) => {
  res.send("상품 리스트");
});

router.get("/detail", (req, res) => {
  res.send("상품 상세정보");
});

router.get("/:id/detail", (req, res) => {
  res.send("상품 아이디 상세정보");
});

module.exports = router;
