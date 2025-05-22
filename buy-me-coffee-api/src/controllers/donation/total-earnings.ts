import { RequestHandler } from "express";
import { prisma } from "../../db";

export const totalEarningsFromDonations: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);

  if (!userId || isNaN(userId)) {
  }

  try {
    const allDonations = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        donations: {
          select: { amount: true },
        },
      },
    });

    if (!allDonations) {
      res.status(404).json({ message: "Donation өгөөгүй байна" });
      return;
    }

    const totalEarnings = allDonations.donations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );
    res.status(200).json(totalEarnings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
