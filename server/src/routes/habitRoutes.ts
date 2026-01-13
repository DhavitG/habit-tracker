import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware.js";
import {
  createHabit,
  getAllHabits,
  updateHabit,
  deleteHabit,
} from "../controllers/habitController.js";

const router = Router();

router.post("/", userMiddleware, createHabit);
router.get("/", userMiddleware, getAllHabits);
router.patch("/:id", userMiddleware, updateHabit);
router.delete("/:id", userMiddleware, deleteHabit);

export default router;
