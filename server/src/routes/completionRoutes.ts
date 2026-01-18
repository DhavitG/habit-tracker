import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware.js";
import {
  updateCompletion,
  getTodayCompletions,
  getCompletionHabits,
  updateSpecificHabitCompletion,
  deleteCompletion,
} from "../controllers/completionController.js";

const router = Router();

router.post("/", userMiddleware, updateCompletion);
router.get("/today", userMiddleware, getTodayCompletions);
router.get("/habit/:habitId", userMiddleware, getCompletionHabits);
router.patch("/:id", userMiddleware, updateSpecificHabitCompletion);
router.delete("/:id", userMiddleware, deleteCompletion);

export default router;
