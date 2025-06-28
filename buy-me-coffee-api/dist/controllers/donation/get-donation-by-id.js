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
exports.getDonationById = void 0;
const db_1 = require("../../db");
const getDonationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { donationId } = req.params;
    try {
        const donation = yield db_1.prisma.donation.findUnique({
            where: {
                id: Number(donationId),
            },
            include: {
                recipient: true,
            },
        });
        if (!donation) {
            res.status(404).json({ message: "Donation олдсонгүй" });
            return;
        }
        res.status(200).json(donation);
    }
    catch (error) {
        console.error("❌ Donation fetch error:", error);
        res.status(500).json({ message: "Server алдаа гарлаа" });
    }
});
exports.getDonationById = getDonationById;
//# sourceMappingURL=get-donation-by-id.js.map