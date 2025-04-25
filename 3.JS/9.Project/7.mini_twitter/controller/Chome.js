const path = require("path");

// GET /
exports.getHome = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/home.html"));
};

// GET /user/login
exports.getUser = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
};

// GET /user/register
exports.getRegister = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
};
