import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getBankCard: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const bankCard = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        bankCard: true,
      },
    });

    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: "ID буруу байна" });
      return;
    }

    res.status(200).json({
      bankCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Серверийн алдаа гарлаа" });
  }
};
