import express from "express";
import { getAvatar } from "../controllers/getAvatar.js";

const router = express.Router();

router.get("/", getAvatar);

export default router;
