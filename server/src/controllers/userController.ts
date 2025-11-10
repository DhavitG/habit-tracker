import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { z } from "zod";
import UserModel from "../models/User.js";

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

export const userSignUp = async (req: Request, res: Response) => {
  try {
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
      return res.status(400).json({
        message: "Incorrect Format",
        error: parsedDataWithSuccess.error,
      });
    }

    const { email, password, fullName } = req.body;

    // existing userr check
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      fullName,
    });

    return res.status(201).json({
      message: "User created successfully",
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (e: any) {
    console.error("Signup error: ", e);

    // duplicate key error
    if (e.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    // validation error
    if (e.name === "ValidationError") {
      return res.status(422).json({
        message: "Invalid data provided",
        errors: e.errors,
      });
    }

    // database connection error
    if (e.name === "MongoNetworkError" || e.name === "MongoServerError") {
      return res.status(503).json({
        message:
          "Database service temporarily unavailable. Please try again later.",
      });
    }

    // password error
    if (e.message && e.message.includes("bcrypt")) {
      return res.status(500).json({
        message: "Error processing password. Please try again.",
      });
    }

    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
