import { RequestHandler } from "express";
import { prisma } from "../../db";

export const recievedDonations: RequestHandler = async (req, res) => {
  const username = req.params.username;
  if (!username) {
    res.status(400).json({ message: "Хэрэглэгчийн нэр буруу" });
    return;
  }

  try {

    const user = await prisma.user.findUnique({where: { username }})

    if (!user) {
      res.status(404).json({message: "Хэрэглэгч олдсонгүй"})
      return
    }
    const recievedDonations = await prisma.donation.findMany({
      where: { recipientId: user.id },
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
