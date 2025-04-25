const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

const storage = multer.diskStorage({
  // diskStorage : 파일을 저장하기 위한 제어 모드
  // 저장 경로
  destination: (req, file, cb) => {
    // uploads 폴더에 저장
    cb(null, path.join(__dirname, "public", "uploads"));
  },
  // 파일 이름 정보
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname); // path.extname() : 파일의 확장자명 반환
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// GET index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "main.html"));
});

// POST /api/memo
app.post("/api/memo", upload.single("file"), (req, res) => {
  const { inputTitle, inputContent } = req.body;
  const file = req.file;
  console.log("f: ", file);

  const fileUrl = file ? `/uploads/${file.filename}` : null;

  res.json({ inputTitle, inputContent, imageUrl: fileUrl });
});

// PUT /api/memo
app.put("/api/memo", (req, res) => {
  const { updateTitle, updateContent, updateImgUrl, prevImgUrl } = req.body;

  console.log(
    `업데이트 제목 : ${updateTitle}, 업데이트 내용 : ${updateContent}, 업데이트 이미지 : ${updateImgUrl}, 예전 주소: ${prevImgUrl}`
  );

  if (updateImgUrl == null && prevImgUrl) {
    const imgPath = path.join(__dirname, "public", "uploads", prevImgUrl);
    fs.unlink(imgPath, (err) => {
      if (err) {
        console.error("이미지 삭제 실패:", err);
      } else {
        console.log("이미지 삭제 성공:", imgPath);
      }
    });
  }

  res.json({
    updateTitle: updateTitle,
    updateContent: updateContent,
    updateImgUrl: updateImgUrl,
  });
});

// DELETE /api/memo
app.delete("/api/memo", (req, res) => {
  res.status(201);
});

app.listen(PORT, () => {
  console.log("memo server is open!");
});
