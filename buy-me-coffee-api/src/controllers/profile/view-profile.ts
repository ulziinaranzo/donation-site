import { RequestHandler } from "express";
import { prisma } from "../../db";
import { profile } from "console";

export const viewUser: RequestHandler = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username || typeof username !== "string") {
      res.status(400).json({ message: "Хэрэглэгч байхгүй байна" });
      return;
    }
    const profile = await prisma.profile.findFirst({
      where: { user: { username: username } },
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
    if (!profile) {
      res.status(404).json({ message: "Профайл олдсонгүй" });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error try again" });
  }
};
