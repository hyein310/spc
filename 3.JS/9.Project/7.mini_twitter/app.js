const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const homeRouter = require("./routes/home");
app.use("/", homeRouter);

// error page
app.get("(.*)", (req, res) => {
  res.sendFile(path.join(__dirname, "./views.404.html"));
});

app.listen(PORT, () => {
  console.log("server is open!");
  console.log("http://localhost:" + PORT);
});
