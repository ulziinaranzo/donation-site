import { RequestHandler } from "express";
import { prisma } from "../../db";

export const createDonation: RequestHandler = async (req, res) => {
  const { amount, specialMessage, recipientId } = req.body;

  if (!amount || !recipientId) {
    res.status(400).json({ message: "Дутуу мэдээлэл байна" });
    return;
  }

  try {
    const donation = await prisma.donation.create({
      data: {
        amount: Number(amount),
        specialMessage,
        recipient: { connect: { id: Number(recipientId) } },
      },
    });

    res.status(200).json({ message: "Амжилттай donation илгээлээ", donation });
  } catch (error) {
    console.error("Donation creation error:", error);
    res.status(500).json({ message: "Server error, try again" });
    return;
  }
};
