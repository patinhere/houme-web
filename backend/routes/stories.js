import express from "express";
import { getStory } from "../controllers/story.js";

const router = express.Router();

router.get("/", getStory);

export default router;
