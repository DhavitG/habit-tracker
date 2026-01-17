import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware.js";
import {
  updateCompletion,
  getTodayCompletions,
} from "../controllers/completionController.js";

const router = Router();

router.post("/", userMiddleware, updateCompletion);
router.get("/today", userMiddleware, getTodayCompletions);

export default router;
