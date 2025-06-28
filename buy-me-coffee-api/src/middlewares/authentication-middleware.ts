import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access token шаардлагатай" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_NUUTS as string) as {
      userId: number;
    };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(403).json({ message: "Token буруу эсвэл хүчингүй байна" });
    return;
  }
};
