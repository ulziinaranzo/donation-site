import { RequestHandler } from "express";
import { prisma } from "../../db";
import bcrypt from "bcrypt";

export const signUpController: RequestHandler = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400).json({ message: "Имэйл, нууц үг болон хэрэглэгчийн нэр шаардлагатай" });
  return 
  }

  try {
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      res.status(400).json({ message: "Энэ имэйл аль хэдийн бүртгэлтэй байна" });
    return 
    }

    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      res.status(400).json({ message: "Энэ username аль хэдийн бүртгэлтэй байна" });
    return 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    res.status(201).json({
      message: "Хэрэглэгч амжилттай бүртгэгдлээ",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Серверийн алдаа",
      error: error.message || String(error),
    });
  }
};
