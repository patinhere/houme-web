import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import postRoutes from "./routes/posts.js";
import likeRoutes from "./routes/likes.js";
import storyRoutes from "./routes/stories.js";
import relationshipRoutes from "./routes/relationships.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/relationships", relationshipRoutes);

// app.get("/profile", (req, res) => {
//   const q = "SELECT * FROM profiles";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.post("/profile", (req, res) => {
//   const q = "INSERT INTO Persontest (`username`,`email`,`password`) VALUES (?)";
//   const values = ["usertest", "emailtest", "passwordtest"];
//   db.query(q, [values], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("success creating");
//   });
// });

app.listen(8800, () => {
  console.log("Connected");
});
