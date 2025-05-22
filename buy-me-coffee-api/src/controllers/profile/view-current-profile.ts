import { Request, Response } from "express";
import { prisma } from "../../db";

export const viewCurrentProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: "Нэвтрэх шаардлагатай" });
      return;
    }

    const currentProfile = await prisma.profile.findUnique({
      where: { userId },
      select: {
        name: true,
        about: true,
        avatarImage: true,
        socialMediaUrl: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!currentProfile) {
      res.status(404).json({ message: "Профайл олдсонгүй" });
      return;
    }

    res.json(currentProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error try again" });
  }
};
