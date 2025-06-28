import { RequestHandler } from "express";
import { prisma } from "../../db";

export const createProfile: RequestHandler = async (req, res) => {
  const username = req.params.username;

  if (!username || typeof username !== "string") {
    res.status(400).json({ message: "username буруу" });
    return;
  }

  const { name, about, avatarImage, socialMediaUrl } = req.body;

  if (!name || !about || !socialMediaUrl) {
    res
      .status(400)
      .json({ message: "Нэр, тухай болон социал хуудас шаардлагатай" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }

    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        name,
        about,
        avatarImage: avatarImage || null,
        socialMediaUrl,
      },
      create: {
        name,
        about,
        avatarImage: avatarImage || null,
        socialMediaUrl,
        userId: user.id,
      },
    });

    const updatedUser = await prisma.user.findUnique({
      where: { username: username },
      include: {
        profile: true,
        bankCard: true,
      },
    });

    res.status(201).json({
      message: "Хэрэглэгчийн profile амжилттай хадгалагдлаа",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Profile үүсгэхэд алдаа:", error.message || error);
    res.status(500).json({
      message: "Profile үүсгэхэд алдаа гарлаа",
      error: error.message || String(error),
    });
  }
};
