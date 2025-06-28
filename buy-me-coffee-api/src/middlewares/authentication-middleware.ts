import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Token олдсонгүй" });
      return;
    }

    const token = authHeader.substring(7);

    if (!token) {
      res.status(401).json({ message: "Token олдсонгүй" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_NUUTS as string) as {
      userId: number;
    };

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Token буруу байна" });
  }
};
