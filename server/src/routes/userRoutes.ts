import { Router } from "express";
import { userSignUp } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signup", userSignUp);

export default userRouter;
