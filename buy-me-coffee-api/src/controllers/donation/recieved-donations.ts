import { RequestHandler } from "express";
import { prisma } from "../../db";

export const recievedDonations: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);
  try {
    const recievedDonations = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        donations: true,
      },
    });

    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: "ID буруу" });
      return;
    }
    res.status(200).json({ recievedDonations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
