import { RequestHandler } from "express";
import { prisma } from "../../db";

export const createDonation: RequestHandler = async (req, res) => {
  
  const { amount, specialMessage, recipientId } = req.body;
  const senderId = req.userId ? req.userId : null

  if (!amount || !recipientId) {
    res.status(400).json({ message: "Дутуу мэдээлэл байна" });
    return;
  }

  const recipientUser = await prisma.user.findUnique({
    where: { id: (recipientId) },
  });

  if (!recipientUser) {
    res.status(404).json({ message: "Recipient user олдсонгүй" });
    return; 
  }
  try {
    const donation = await prisma.donation.create({
      data: {
        amount: Number(amount),
        specialMessage,
        recipient: { connect: { id: (recipientId) } },
        sender: senderId ? { connect: { id: senderId } } : undefined
      },
      include: {
        sender: {
          include: {
            profile: true
          }
        },
        recipient: {
          include: {
            profile: true
          }
        }
      }
    });

    res.status(200).json({ message: "Амжилттай donation илгээлээ", donation });
  } catch (error) {
    console.error("Donation creation error:", error);
    res.status(500).json({ message: "Server error, try again" });
    return;
  }
};
