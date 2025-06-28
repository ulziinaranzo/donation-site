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
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
    });

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByUsername) {
      res.status(400).json({
        message: "Энэ хэрэглэгчийн нэрийг аль хэдийн ашиглаж байна",
      });
      return;
    }

    if (existingUserByEmail) {
      res.status(400).json({
        message: "Энэ имэйлийг аль хэдийн бүртгэсэн байна",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        name: username,
        profile: {
          create: {
            name: username,
            about: "",
            avatarImage: "",
            socialMediaUrl: "",
            backgroundImage: "",
            successMessage: "",
          },
        },
      },
      include: {
        profile: true,
        bankCard: true,
        donations: true,
        received: true,
      },
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_NUUTS as string,
      { expiresIn: "1d" }
    );

    const { password: _, ...userWithoutPassword } = user;

    console.log("User created successfully:", user.email);
    console.log("Profile created:", user.profile);

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
