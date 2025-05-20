import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getUserController: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: { profile: true, bankCard: true, donations: true },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error try again" });
  }
};
