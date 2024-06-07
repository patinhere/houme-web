import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const router = express.Router();

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  const file = req.file;
  // const userId = req.query.userId;

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "houme",
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload file" });
  }
});

export default router;
//, function (err, result) {
// if (err) return res.status(500).json("error");
