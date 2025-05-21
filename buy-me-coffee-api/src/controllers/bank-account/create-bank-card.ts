import { RequestHandler } from "express";
import { prisma } from "../../db";

export const createBankCard: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);

  if (!userId || isNaN(userId)) {
    res.status(400).json({ message: "ID буруу" });
    return;
  }
  const { country, firstName, lastName, cardNumber, expiryDate } = req.body;

  if (!country || !firstName || !lastName || !cardNumber || !expiryDate) {
    res.status(400).json({ message: "Мэдээлэл дутуу байна" });
    return;
  }
  try {
    const bankCard = await prisma.bankCard.create({
      data: {
        country,
        firstName,
        lastName,
        cardNumber,
        expiryDate,
        user: { connect: { id: userId } },
      },
    });
    res.status(201).json({ message: "Банкны карт нэмэгдлээ", bankCard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Банкны карт нэмэхэд алдаа гарлаа" });
  }
};
