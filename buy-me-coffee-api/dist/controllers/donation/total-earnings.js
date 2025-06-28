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
exports.totalEarningsFromDonations = void 0;
const db_1 = require("../../db");
const totalEarningsFromDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    if (!userId || isNaN(userId)) {
    }
    try {
        const allDonations = yield db_1.prisma.user.findFirst({
            where: { id: userId },
            select: {
                donations: {
                    select: { amount: true },
                },
            },
        });
        if (!allDonations) {
            res.status(404).json({ message: "Donation өгөөгүй байна" });
            return;
        }
        const totalEarnings = allDonations.donations.reduce((sum, donation) => sum + donation.amount, 0);
        res.status(200).json(totalEarnings);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.totalEarningsFromDonations = totalEarningsFromDonations;
//# sourceMappingURL=total-earnings.js.map