import { RequestHandler } from "express";
import { prisma } from "../../db";

export const updateProfile: RequestHandler = async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    res.status(400).json({ message: "Зөв хэрэглэгчийн ID илгээнэ үү" });
    return;
  }

  const {
    avatarImage,
    about,
    name,
    socialMediaUrl,
    backgroundImage,
    successMessage,
  } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }

    const existingProfile = await prisma.profile.findUnique({
      where: { id: userId },
    });

    let updatedProfile;

    if (existingProfile) {
      updatedProfile = await prisma.profile.update({
        where: { id: userId },
        data: {
          avatarImage,
          about,
          name,
          socialMediaUrl,
          backgroundImage,
          successMessage,
        },
      });
    } else {
      updatedProfile = await prisma.profile.create({
        data: {
          avatarImage,
          about,
          name,
          socialMediaUrl,
          backgroundImage,
          successMessage,
          user: {
            connect: { id: userId },
          },
        },
      });
    }

    res.status(200).json({
      message: "Амжилттай хэрэглэгчийн профайлыг шинэчлэлээ",
      updatedProfile,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Серверийн алдаа, дахин оролдоно уу" });
  }
};
