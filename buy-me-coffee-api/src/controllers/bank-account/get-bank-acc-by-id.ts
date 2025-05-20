import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getBankAccById: RequestHandler = async (req, res) => {
try {
    const userId = Number(req.params.id);
    if (!userId || isNaN(userId)) {
        res.status(400).json({message: "ID буруу"})
        return;
const getBankAcc = await prisma.user.findFirst({where: { id: userId}, include: {bankCard: true}})
if (!getBankAcc || !getBankAcc.bankCard) {
    res.status(404).json({message: "Банкны мэдээлэл олдсонгүй"})
}

res.status(200).json({message: "Хэрэглэгчийн мэдээллийг харуулж байна"})
  }  catch (error) {
        console.error("Картын мэдээлэл авахад алдаа гарлаа")
         res.status(500).json({message:"Server error"});
         return
    }

}