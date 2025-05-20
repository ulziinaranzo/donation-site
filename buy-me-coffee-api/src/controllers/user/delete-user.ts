import { RequestHandler } from "express";
import { prisma } from "../../db";

export const deleteUser: RequestHandler = async (req, res) => {
  const userId = Number(req.params.id);
  try {
    const deletedUser = await prisma.user.delete({ where: { id: userId } });
    res.json({ message: "Хэрэглэгч амжилттай устлаа" });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Устгахад алдаа гарлаа" });
  }
};
