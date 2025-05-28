import { RequestHandler } from "express";
import { prisma } from "../../db";

export const updateBankCard: RequestHandler = async (req, res) => {
  
  try {
       
    const bankCardId = Number(req.params.bankCardId);
    const { expiryDate, firstName, lastName, country, cardNumber } = req.body;

    if (!bankCardId || isNaN(bankCardId)) {
      res.status(400).json({ message: "ID буруу байна" });
      return;
    }

    const updatedBankCard = await prisma.bankCard.update({
      where: { id: bankCardId },
      data: {
        expiryDate,
        firstName,
        lastName,
        country,
        cardNumber,
        updatedAt: new Date(),
      },
    });
    res
      .status(200)
      .json({ message: "Амжилттай шинэчлэгдлээ", bankCard: updatedBankCard });
  } catch (error) {
    console.error(error);
    if ((error as any).code === "P2025") {
      res.status(404).json({ message: "Мэдээлэл олдсонгүй" });
    }
  }
};
