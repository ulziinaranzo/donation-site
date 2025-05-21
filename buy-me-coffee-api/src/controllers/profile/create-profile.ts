import { RequestHandler } from "express";
import { prisma } from "../../db";

export const createProfile: RequestHandler = async (req, res) => {
  const username = req.params.username;

  if (!username || typeof username !== "string") {
    res.status(400).json({ message: "username буруу" });
    return;
  }

  const { name, about, avatarImage, socialMediaUrl } = req.body;

  if (!name || !about || !avatarImage || !socialMediaUrl) {
    res.status(400).json({ message: "Мэдээлэл дутуу" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    const existingProfile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    if (existingProfile) {
      res
        .status(400)
        .json({ message: "Энэ хэрэглэгчийн profile аль хэдийн үүссэн байна" });
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        about,
        avatarImage,
        socialMediaUrl,
        user: { connect: { id: user.id } },
      },
    });
    res.status(201).json({ message: "Хэрэглэгчийн profile үүслээ", profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Profile үүсгэхэд алдаа гарлаа" });
  }
};
