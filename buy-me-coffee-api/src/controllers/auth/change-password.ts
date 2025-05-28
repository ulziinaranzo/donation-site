import { RequestHandler } from "express";
import { prisma } from "../../db"; 
import bcrypt from "bcrypt"

export const changePassword: RequestHandler = async (req, res) => {
const userId = parseInt(req.params.userId);
if (isNaN(userId)) {
  res.status(400).json({ message: "Хэрэглэгчийн ID буруу байна" });
  return 
}

    const { newPassword, currentPassword } = req.body

    try {
        const user = await prisma.user.findUnique({ where: { id:userId}})
        if (!user) {
            res.status(404).json({message: "Ийм хэрэглэгч байхгүй байна"})
            return
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isPasswordMatch) {
            res.status(401).json({message: "Хуучин нууц үг буруу байна"})
            return
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10)

        const updatedPassword = await prisma.user.update({
            where: {id: userId },
             data: {
                password: hashedNewPassword,
                updatedAt: new Date()
             }
        })
        res.status(200).json({message: "Нууц амжилттай солигдлоо"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server error, try again"})
    }
}