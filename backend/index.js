import express from "express";
import cors from "cors";
import multer from "multer";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";

// routes
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import postRoutes from "./routes/posts.js";
import likeRoutes from "./routes/likes.js";
import storyRoutes from "./routes/stories.js";
import relationshipRoutes from "./routes/relationships.js";
import suggestionRoutes from "./routes/suggestions.js";
import historyRoutes from "./routes/history.js";
import uploadAvatar from "./routes/uploadAvatar.js";
import getAvatar from "./routes/getAvatar.js";

dotenv.config();
const app = express();
const allowedOrigins = ["https://houme.onrender.com", "http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// multer
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

// routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/story", storyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/uploadAvatar", uploadAvatar);
app.use("/api/getAvatar", getAvatar);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/history", historyRoutes);

const Port = process.env.PORT;
app.listen(Port, () => {
  console.log("Connected");
});
