import { RequestHandler } from "express";
import { prisma } from "../../db";

export const exploreProfile: RequestHandler = async (req, res) => {
    try {
        const allProfiles = await prisma.profile.findMany({
            select: {
                name: true,
                about: true,
                avatarImage: true,
                socialMediaUrl: true,
                user: { select: {
                    username: true,
                }
                    
                }
            }
        })

        if (!allProfiles || allProfiles.length === 0) {
            res.status(404).json({message: "Хэрэглэгч байхгүй байна"})
            return
        }
        res.status(200).json({message: "Амжилттай хэрэглэгчдийг авлаа", allProfiles})
    } catch (error) {
        console.error(error) 
        res.status(500).json({message: "Server error, try again"})
    }
}