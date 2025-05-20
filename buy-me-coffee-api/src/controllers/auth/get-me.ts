import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getMe: RequestHandler = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await prisma.findFirst({
      where: { id: userId },
      omit: {
        password: true,
      },
      include: {
        profile: true,
        bankCard: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Сервер алдаа", error });
  }
};
