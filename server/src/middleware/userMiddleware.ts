import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"]?.split(" ")[1];

  if (!header) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(
      header as string,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (decoded) {
      req.userId = decoded.userId;
      next();
    }
  } catch (e) {
    res.status(403).json({ message: "You are not logged in." });
  }
};

export { userMiddleware };
