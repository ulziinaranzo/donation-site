import { RequestHandler } from "express";
import { prisma } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Имэйл болон нууц үг шаардлагатай" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        profile: true,
        bankCard: true,
        donations: {
          include: {
            recipient: {
              include: {
                profile: true,
              },
            },
            sender: {
              include: {
                profile: true,
              },
            },
          },
        },
        received: {
          include: {
            recipient: {
              include: {
                profile: true,
              },
            },
            sender: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ message: "Имэйл эсвэл нууц үг буруу байна" });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({ message: "Имэйл эсвэл нууц үг буруу байна" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_NUUTS as string,
      { expiresIn: "1d" }
    );

    const { password: _, ...userWithoutPassword } = user;

    console.log("SignIn successful for user:", user.email);
    console.log("Profile data:", user.profile);
    console.log("Avatar image:", user.profile?.avatarImage);

    res.status(200).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("SignIn error:", error);
    res.status(500).json({ message: "Сервер дээр алдаа гарлаа" });
  }
};
