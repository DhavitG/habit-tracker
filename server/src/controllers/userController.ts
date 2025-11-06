import type { Request, Response } from "express";
import { z } from "zod";

const requiredBody = z.object({
  fullName: z.string().min(5).max(40),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/\d/, "Must contain number")
    .regex(/[@$!%*?&#]/, "Must contain special character"),
});

export const userSignUp = (req: Request, res: Response) => {
  try {
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
      res.status(400).json({
        message: "Incorrect Format",
        error: parsedDataWithSuccess.error,
      });
    }

    const { email, password, fullName } = req.body;
  } catch (e) {}
};
