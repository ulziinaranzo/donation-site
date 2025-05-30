import { Request, Response } from "express";
import { prisma } from "../../db";

export const viewProfileById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Profile авахад алдаа гарлаа:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};
