import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getUserByUsername: RequestHandler = async (req, res) => {
    const { username } = req.params;

    if (!username) {
        res.status(400).json({ message: "Username оруулна уу" });
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: { username },
            include: {
                profile: true,
            },
        });

        if (!user) {
            res.status(400).json({ message: "Хэрэглэгч олдсонгүй" });
            return;
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error try again" });
    }
};
