import { RequestHandler } from "express";
import { prisma } from "../../db";

export const recievedDonations: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);
  if (!userId || isNaN(userId)) {
    res.status(400).json({ message: "ID буруу" });
    return;
  }

  try {
    const recievedDonations = await prisma.donation.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: "desc" },
      include: {
        recipient: {
          include: {
            profile: true,
          },
        },
        sender: {
          include: {
            profile: true,
          },
        },
      },
    });

    res.status(200).json({ donations: recievedDonations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
