import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authenticationMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const { userId } = jwt.verify(token, process.env.JWT_NUUTS!) as {
      userId: string;
    };

    (req as any).userId = userId; 
    next();
  } catch (error) {
    console.error("Invalid token", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
