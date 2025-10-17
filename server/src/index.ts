import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/user.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.use("/api/v1/users", userRouter);

async function main() {
  app.listen(PORT);
}

main();
