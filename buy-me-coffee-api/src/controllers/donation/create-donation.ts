// import { RequestHandler } from "express";
// import { prisma } from "../../db";

// export const createDonation: RequestHandler = async (req, res) => {
//   const userId = Number((req as any).userId);

//   if (!userId) {
//     return res.status(400).json({ message: "Хэрэглэгч байхгүй байна" });
//   }

//   const { amount, specialMessage, recipientId } = req.body;

//   if (!amount || !recipientId) {
//     return res.status(400).json({ message: "Дутуу мэдээлэл байна" });
//   }

//   try {
// const donation = await prisma.donation.create({
//   data: {
//     amount: Number(amount),
//     specialMessage,
//     sender: { connect: { id: userId } },
//     recipient: { connect: { id: Number(recipientId) } },
//   },
// });


//     return res
//       .status(200)
//       .json({ message: "Амжилттай donation илгээлээ", donation });
//   } catch (error) {
//     console.error("Donation creation error:", error);
//     return res.status(500).json({ message: "Server error, try again" });
//   }
// };
