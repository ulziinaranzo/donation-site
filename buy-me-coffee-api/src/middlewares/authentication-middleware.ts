import { RequestHandler, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticationMiddleware: RequestHandler = async (req, res, next) => {
    const token = req.headers.authorization
    
    if (!token) {
        res.status(401).json({message: "Unauthorized"})
        return
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
            userId: string;
        }

        (req as any).userId = userId;

        next()
    } catch (error) {
        res.status(401).json({message: "Invalid token"})
    }
}