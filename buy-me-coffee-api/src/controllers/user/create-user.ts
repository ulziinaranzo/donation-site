import { RequestHandler } from "express";
import { prisma } from "../../db";

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const user = await prisma.user.create({
      data: {
        email,
        password,
        username,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({ message: "Хэрэглэгч үүслээ", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Хэрэглэгч үүсгэхэд алдаа гарлаа" });
  }
};
