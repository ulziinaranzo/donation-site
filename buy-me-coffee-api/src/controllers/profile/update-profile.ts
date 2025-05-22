import { RequestHandler } from "express";
import { prisma } from "../../db";

export const updateProfile: RequestHandler = async (req, res) => {
    const userId = Number(req.params.userId);
    
    if (!userId) {
        res.status(400).json({message: "Хэрэглэгч байхгүй байна"})
        return;
    }

    const {avatarImage, about, name, socialMediaUrl, backgroundImage, successMessage} = req.body
try {
        const updatedProfile = await prisma.profile.update({
        where: {
            id:userId 
        },
        data: { avatarImage, about, name, socialMediaUrl, backgroundImage, successMessage}
    })
    res.status(200).json({message: "Амжилттай хэрэглэгчийн профайлыг шинэчлэлээ", updatedProfile})
} catch (error) {
    console.error(error) 
    res.status(500).json({message: "Server error, try again"})
    return
}

}