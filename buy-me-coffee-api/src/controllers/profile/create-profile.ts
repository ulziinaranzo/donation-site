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
      return
    }

    const existingProfile = await prisma.profile.findFirst({
      where: { userId: user.id },
    });

    if (existingProfile) {
      res
        .status(400)
        .json({ message: "Энэ хэрэглэгчийн profile аль хэдийн үүссэн байна" });
        return
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        about,
        avatarImage,
        socialMediaUrl,
        userId: user.id,
      },
    });
    res.status(201).json({ message: "Хэрэглэгчийн profile үүслээ", profile });
  } catch (error: any) {
  console.error("Profile үүсгэхэд алдаа:", error.message || error);
  res.status(500).json({ message: "Profile үүсгэхэд алдаа гарлаа", error: error.message || String(error) });
}
};
