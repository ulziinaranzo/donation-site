import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getMe: RequestHandler = async (req, res) => {
  try {
    const userId = req.userId;

    console.log("Getting user data for userId:", userId);

    if (!userId) {
      console.error("No userId found in request");
      res.status(401).json({ message: "User ID not found in token" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        bankCard: true,
      },
    });

    if (!user) {
      console.error("User not found in database for ID:", userId);
      res.status(404).json({ message: "User not found" });
      return;
    }

    console.log("User found successfully:", user.email);

    const { password, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({
      message: "Сервер алдаа",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};
