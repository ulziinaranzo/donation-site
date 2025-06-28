import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getDonationById: RequestHandler = async (req, res) => {
  const { donationId } = req.params;

  try {
    const donation = await prisma.donation.findUnique({
      where: {
        id: Number(donationId),
      },
      include: {
        recipient: true,
      },
    });

    if (!donation) {
      res.status(404).json({ message: "Donation олдсонгүй" });
      return;
    }

    res.status(200).json(donation);
  } catch (error) {
    console.error("❌ Donation fetch error:", error);
    res.status(500).json({ message: "Server алдаа гарлаа" });
  }
};
