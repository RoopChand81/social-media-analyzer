const express = require("express");
const multer = require("multer");
const path = require("path");
const { analyzeFile } = require("../controllers/analyzeController");

const router = express.Router();

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

function fileFilter(req, file, cb) {
  const allowed = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Unsupported file type"), false);
  }
  cb(null, true);
}

const upload = multer({ storage, limits: { fileSize: MAX_FILE_BYTES }, fileFilter });

router.post("/", upload.single("file"), analyzeFile);

module.exports = router;