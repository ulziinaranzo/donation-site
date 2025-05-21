import { RequestHandler } from "express";
import { prisma } from "../../db";

export const updateUserController: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { email, password, username } = req.body;
    if (!userId) {
      res.status(400).json({ message: "Энэ хэрэглэгч байхгүй байна" });
      return;
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { email, password, username, updatedAt: new Date() },
      include: {
        bankCard: true,
        profile: true,
      },
    });

    res.status(200).json({ message: "Амжилттай солилоо", user: updatedUser });
    return;
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }
  }
};
