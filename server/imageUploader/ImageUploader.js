const express = require("express");
const router = express.Router();
const multer = require("multer");

// COLLECT AND STORE IMAGES
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "imageStorage");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
router.post("/", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

module.exports = router;
