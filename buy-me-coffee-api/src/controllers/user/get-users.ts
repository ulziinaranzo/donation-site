import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getUsersController: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        bankCard: true,
        profile: true,
        donations: true,
      },
    });

    if (!users || users.length === 0) {
      res.status(404).json({ message: "No users found" });
      return;
    }

    res.status(200).json({ message: "Амжилттай авлаа", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, try again later" });
  }
};
