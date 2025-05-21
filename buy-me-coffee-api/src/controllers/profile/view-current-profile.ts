import { RequestHandler } from "express";
import { prisma } from "../../db";

export const viewCurrentProfile: RequestHandler = async (req, res) => {
  try {
    const profileId = Number(req.params.id);
    const currentProfile = await prisma.profile.findFirst({
      where: { id: profileId },
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
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error try again" });
  }
};
