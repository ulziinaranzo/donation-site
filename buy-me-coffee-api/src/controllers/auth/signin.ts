import { RequestHandler } from "express";
import { prisma } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.findFirst({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "Имэйл эсвэл нууц үг буруу байна" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({ message: "Имэйл эсвэл нууц үг буруу байна" });
    }
    const token = jwt.sign(
      { userId: user.id, isAdmin: user.role === "admin" },
      process.env.JWT_SECRET as string
    );

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: "Сервер дээр алдаа гарлаа" });
  }
};
