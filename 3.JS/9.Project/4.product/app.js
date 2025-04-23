const express = require("express");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const db = new sqlite3.Database("user.db");

app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// home
app.get("/", (req, res) => {
  // res.sendFile("home.html");
  res.sendFile(path.join(__dirname, "public", "html", "home.html"));
});

// 로그인 된 사용자
app.get("/user", (req, res) => {
  console.log("session:: ", req.session.user);
  const user = req.session.user;

  if (user) {
    res.json(user.username);
  } else {
    // res.status(401).json({ err: "로그인되지 않았습니다." });
    res.json({ err: "로그인되지 않았습니다." });
  }
});

// login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "login.html"));
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("회원 입력 값:: ", username, password);
  db.get(
    "SELECT * FROM users WHERE username=?",
    [username],
    async (err, row) => {
      if (row) {
        const isMatch = await bcrypt.compare(password, row.password);
        if (isMatch) {
          req.session.user = {
            username: row.username,
            password: row.password,
          };
          res.redirect("/");
        } else {
          res.send("로그인 정보 없음");
        }
      } else {
        res.status(401).json({ msg: "로그인실패" });
      }
    }
  );
});

// product
app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "product.html"));
});

app.get("/productList", (req, res) => {
  const productList = [];
  db.each(
    "SELECT * FROM product",
    (err, row) => {
      if (err) {
        console.error(err);
        return;
      }
      productList.push(row);
    },
    (err, count) => {
      console.log("pp: ", productList);
      res.json(productList);
    }
  );
});

app.post("/productAdd", (req, res) => {
  console.log("요청:: ", req.body);
  res.json({ msg: "추가완료" });
});

// cart
app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "cart.html"));
});

// 세션에 상품 저장
app.get("/cartList", (req, res) => {});

app.listen(port, () => {
  console.log("server is open");
});
