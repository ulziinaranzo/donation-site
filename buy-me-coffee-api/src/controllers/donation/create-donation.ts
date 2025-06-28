import { RequestHandler } from "express";
import { prisma } from "../../db";

export const createDonation: RequestHandler = async (req, res) => {
  const { amount, specialMessage, recipientId, senderId, socialMediaUrl } =
    req.body;

  console.log("Creating donation with data:", {
    amount,
    specialMessage,
    recipientId,
    senderId,
    socialMediaUrl,
  });

  if (!amount || !recipientId) {
    console.error("Missing required fields:", { amount, recipientId });
    res.status(400).json({ message: "Дутуу мэдээлэл байна" });
    return;
  }

  try {
    const recipientUser = await prisma.user.findUnique({
      where: { id: recipientId },
    });

    if (!recipientUser) {
      console.error("Recipient user not found:", recipientId);
      res.status(404).json({ message: "Recipient user олдсонгүй" });
      return;
    }

    const donation = await prisma.donation.create({
      data: {
        amount: Number(amount),
        specialMessage: specialMessage || "",
        socialMediaUrl: socialMediaUrl || "",
        isPaid: false, 
        recipient: { connect: { id: recipientId } },
        sender: senderId ? { connect: { id: senderId } } : undefined,
        createdAt: new Date(),
      },
      include: {
        sender: {
          include: {
            profile: true,
          },
        },
        recipient: {
          include: {
            profile: true,
          },
        },
      },
    });

    console.log("Donation created successfully:", {
      id: donation.id,
      amount: donation.amount,
      isPaid: donation.isPaid,
    });

    res.status(200).json({
      message: "Donation үүсгэгдлээ",
      donation,
      id: donation.id,
    });
  } catch (error) {
    console.error("Donation creation error:", error);
    res.status(500).json({ message: "Server error, try again" });
    return;
  }
};
