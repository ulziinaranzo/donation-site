import { RequestHandler } from "express";
import { prisma } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpController: RequestHandler = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res
      .status(400)
      .json({ message: "Имэйл, нууц үг болон хэрэглэгчийн нэр шаардлагатай" });
    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username, email },
    });
    if (existingUser) {
      res.status(400).json({
        message: "Энэ username, email-ийг аль хэдийн бүртгэсэн байна",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_NUUTS as string,
      { expiresIn: "1d" }
    );

    if (!user) {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: "Хэрэглэгч амжилттай бүртгэгдлээ",
      token,
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Серверийн алдаа",
      error: error.message || String(error),
    });
  }
};
