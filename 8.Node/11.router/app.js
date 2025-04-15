const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3000;

const mainRouter = require("./router/mainRouter");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");

app.use(morgan("dev"));

app.use("/", mainRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(PORT, () => {
  console.log("server is open~");
});
