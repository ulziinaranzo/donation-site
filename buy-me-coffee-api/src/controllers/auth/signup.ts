import { RequestHandler } from "express";
import { prisma } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpController: RequestHandler = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Ийм имэйлтэй хэрэглэгч байна" });
      return;
    }

    const existingUsername = await prisma.user.findFirst({
      where: { username },
    });
    if (existingUsername) {
      res.status(400).json({ message: "Ийм нэртэй хэрэглэгчийн нэр байна" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_NUUTS as string
    );

    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: "Сервер дээр алдаа гарлаа", error });
  }
};
