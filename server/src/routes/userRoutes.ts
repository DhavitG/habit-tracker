import { Router } from "express";
import { userSignIn, userSignUp } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/signin", userSignIn);

export default userRouter;
