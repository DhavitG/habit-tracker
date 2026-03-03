import { Router } from "express";
import {
  getMe,
  updateMe,
  userSignIn,
  userSignUp,
} from "../controllers/userController.js";
import { userMiddleware } from "../middleware/userMiddleware.js";

const userRouter = Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/signin", userSignIn);
userRouter.get("/me", userMiddleware, getMe);
userRouter.patch("/me", userMiddleware, updateMe);

export default userRouter;
