import { RequestHandler } from "express";
import { prisma } from "../../db";

export const viewUser: RequestHandler = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username || typeof username !== "string") {
      res.status(400).json({ message: "Хэрэглэгч байхгүй байна" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        profile: {
          select: {
            name: true,
            about: true,
            avatarImage: true,
            socialMediaUrl: true,
            backgroundImage: true,
          },
        },
      },
    });

    if (!user || !user.profile) {
      res.status(404).json({ message: "Профайл олдсонгүй" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};
