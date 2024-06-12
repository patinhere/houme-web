import express from "express";
import { addHistory, getHistory } from "../controllers/history";

const router = express.Router();

router.get("/", getHistory);
router.post("/", addHistory);

export default router;
