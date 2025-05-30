import { Prisma, PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient

export const checkUsername: RequestHandler = async (req, res) => {
    const username  = req.query.username as string
    
    const existingUser = await prisma.user.findUnique({
        where: { username }
    })

    if (existingUser) {
        res.status(409).json({message: "Ийм username-тэй хэрэглэгч байна"})
    }
    res.status(200).json({message: "Username амжилттай бүртгэгдлээ"})
}