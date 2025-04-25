const express = require("express");
const controller = require("../controller/Chome");
const router = express.Router();

router.get("/", controller.getHome);

module.exports = router;
