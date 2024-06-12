import express from "express";
import { addHistory, getHistory } from "../controllers/history.js";

const router = express.Router();

router.get("/", getHistory);
router.post("/", addHistory);

export default router;
