const path = require("path");

// GET /user/login
exports.getUser = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
};

// GET /user/register
exports.getRegister = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
};

// POST /user/login
exports.postUser = (req, res) => {
  const { email, pw } = req.body;
};
