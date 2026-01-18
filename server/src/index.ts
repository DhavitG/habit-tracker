import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "./config/passport.js";

import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRouter.js";
import habitRouter from "./routes/habitRoutes.js";
import completionRouter from "./routes/completionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const PORT = process.env.PORT;

app.use("/api/v1/users", userRouter);
app.use("/auth", authRouter);
app.use("/api/v1/habits", habitRouter);
app.use("/api/v1/completions", completionRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URI as string);
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`); // Add this!
  });
}

main();
