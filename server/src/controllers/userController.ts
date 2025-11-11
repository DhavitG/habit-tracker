import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { email, z } from "zod";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const signupBody = z.object({
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

const signinBody = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const userSignUp = async (req: Request, res: Response) => {
  try {
    const parsedDataWithSuccess = signupBody.safeParse(req.body);

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

export const userSignIn = async (req: Request, res: Response) => {
  try {
    const parsedDataWithSuccess = signinBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
      return res.status(400).json({
        message: "Incorrect Format",
        error: parsedDataWithSuccess.error,
      });
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Inavlid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "User signed in",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (e: any) {
    console.error("Signin error:", e);

    if (e.name === "MongoNetworkError" || e.name === "MongoServerError") {
      return res.status(503).json({
        message:
          "Database service temporarily unavailable. Please try again later.",
      });
    }

    if (
      e.message &&
      (e.message.includes("jwt") || e.message.includes("secret"))
    ) {
      return res.status(500).json({
        message: "Authentication service error. Please try again.",
      });
    }

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
