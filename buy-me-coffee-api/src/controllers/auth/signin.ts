import { RequestHandler } from "express";
import { prisma } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email, password);

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "Имэйл эсвэл нууц үг буруу байна" });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({ message: "Имэйл эсвэл нууц үг буруу байна" });
      return
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_NUUTS as string
    );

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: "Сервер дээр алдаа гарлаа" });
  }
};
