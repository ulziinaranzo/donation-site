"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDonation = void 0;
const db_1 = require("../../db");
const createDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, specialMessage, recipientId, senderId, socialMediaUrl } = req.body;
    console.log("Creating donation with data:", {
        amount,
        specialMessage,
        recipientId,
        senderId,
        socialMediaUrl,
    });
    if (!amount || !recipientId) {
        console.error("Missing required fields:", { amount, recipientId });
        res.status(400).json({ message: "Дутуу мэдээлэл байна" });
        return;
    }
    try {
        const recipientUser = yield db_1.prisma.user.findUnique({
            where: { id: recipientId },
        });
        if (!recipientUser) {
            console.error("Recipient user not found:", recipientId);
            res.status(404).json({ message: "Recipient user олдсонгүй" });
            return;
        }
        const donation = yield db_1.prisma.donation.create({
            data: {
                amount: Number(amount),
                specialMessage: specialMessage || "",
                socialMediaUrl: socialMediaUrl || "",
                isPaid: false,
                recipient: { connect: { id: recipientId } },
                sender: senderId ? { connect: { id: senderId } } : undefined,
                createdAt: new Date(),
            },
            include: {
                sender: {
                    include: {
                        profile: true,
                    },
                },
                recipient: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        console.log("Donation created successfully:", {
            id: donation.id,
            amount: donation.amount,
            isPaid: donation.isPaid,
        });
        res.status(200).json({
            message: "Donation үүсгэгдлээ",
            donation,
            id: donation.id,
        });
    }
    catch (error) {
        console.error("Donation creation error:", error);
        res.status(500).json({ message: "Server error, try again" });
        return;
    }
});
exports.createDonation = createDonation;
//# sourceMappingURL=create-donation.js.map