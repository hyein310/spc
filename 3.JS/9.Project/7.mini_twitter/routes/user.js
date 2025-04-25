const express = require("express");
const controller = require("../controller/Cuser");
const router = express.Router();

router.get("/user/login", controller.getUser);
router.get("/user/register", controller.getRegister);
router.post("/user/login", controller.postUser);

module.exports = router;
