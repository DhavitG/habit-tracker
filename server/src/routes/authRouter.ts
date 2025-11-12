import { Router, type Request, type Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/auth/error`,
    session: false,
  }),
  (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
    } catch (e) {
      console.error("Oauth callback error: ", e);
      res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
    }
  }
);

export default authRouter;
