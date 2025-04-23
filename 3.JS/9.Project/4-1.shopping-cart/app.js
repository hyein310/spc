// 라이브러리 로딩
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const sqlite = require("sqlite3");
const path = require("path");

// 변수 선언
const app = express();
const port = 3000;
const db = new sqlite.Database("shopping.db", (err) => {
  if (!err) console.log("DB연결 성공");
});

// 각종 미들웨어 등록
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public")); // public 폴더 노출
app.use(
  session({
    secret: "password1234",
    resave: false,
    saveUninitialized: false,
  })
);

// 각종 라우트
app.get("/", (req, res) => res.redirect("/home"));
app.get("/home", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "home.html"))
);
app.get("/cart", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "cart.html"))
);
app.get("/products", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "products.html"))
);

// REST-APIs
// login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  const query = "SELECT * FROM users WHERE username=? AND password=?";

  db.get(query, [username, password], (err, row) => {
    if (err) console.log("오류");
    if (row) {
      req.session.user = { id: row.id, username: row.username };
      res.json({ message: "로그인 성공", username: row.username });
    } else {
      res.status(401).json({ message: "로그인 실패" });
    }
  });
});

// login-check
app.get("/api/check-login", (req, res) => {
  const user = req.session.user;
  if (user) {
    res.json({ message: "Welcome back", username: user.username });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

// logout
app.get("/api/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "로그아웃 성공" });
});

// product
app.get("/api/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.all(query, [], (err, rows) => {
    // 나중에 여기에 에러체크 추가할것
    res.json(rows);
  });
});

// cart
app.get("/api/cart", (req, res) => {
  const cart = req.session.cart || []; // 장바구니에 물건 담은적이 없이 카트를 올수도 있음.
  console.log("내카트: ", cart);
  res.json({ cart });
});

// cart-list
app.post("/api/cart/:productId", (req, res) => {
  const productId = req.params.productId;
  const cart = req.session.cart || [];

  const query = "SELECT * FROM products WHERE id=?";
  db.get(query, [productId], (err, product) => {
    console.log(product);

    // 만약 product가 존재하지 않는다면,
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }
    const existingProduct = cart.find(
      (item) => Number(item.id) === Number(product.id)
    );
    console.log("exist :: ", existingProduct);
    console.log("product.id:", product.id);
    console.log("cart:", cart);

    // 만약 cart에 상품이 존재한다면 quantity++
    if (existingProduct) {
      existingProduct.quantity++;
      req.session.cart = cart;
      res.json({ message: "상품 수량 증가 완료" });
    }

    // 만약 cart에 상품이 존재하지 않는다면 quantity 추가
    else {
      cart.push({ ...product, quantity: 1 });
      req.session.cart = cart;
      res.json({ message: "상품 추가 완료" });
    }
  });
});

// cart-btn (plus-minus)
app.put("/api/cart/:productId", (req, res) => {
  const productId = req.params.productId;
  const { action } = req.body;
  const cart = req.session.cart || [];

  const item = cart.find((p) => p.id == productId);
  // console.log("item:: ",item);
  if (!item) {
    return res.status(404).json({ message: "장바구니에 상품이 없습니다." });
  }

  if (action === "plus") {
    item.quantity++;
  } else if (action === "minus") {
    item.quantity--;
    // quantity 0 이하가 되면 장바구니에서 제거
    if (item.quantity <= 0) {
      // filter 함수는 찾는 값 제외하고 반환
      req.session.cart = cart.filter((p) => p.id != productId);
      return res.json({ message: "상품 제거됨", cart: req.session.cart });
    }
  } else {
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }

  req.session.cart = cart;
  res.json({ message: "상품 개수 업데이트 완료", cart });
});

// cart-btn (delete)
app.delete("/api/cart/:productId", (req, res) => {
  const productId = req.params.productId;
  let cart = req.session.cart || [];

  cart = cart.filter((item) => item.id != productId);

  req.session.cart = cart;
  res.json({ message: "상품이 삭제되었습니다.", cart });
});

// 메인 서버 시작
app
  .listen(port, () => {
    console.log("서버 레디");
  })
  .on("error", (err) => {
    console.error("서버 실행 중 오류 발생:", err.message);
  });
