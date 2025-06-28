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
exports.recievedDonations = void 0;
const db_1 = require("../../db");
const recievedDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    if (!username) {
        res.status(400).json({ message: "Хэрэглэгчийн нэр буруу" });
        return;
    }
    try {
        const user = yield db_1.prisma.user.findUnique({ where: { username } });
        if (!user) {
            res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
            return;
        }
        const recievedDonations = yield db_1.prisma.donation.findMany({
            where: { recipientId: user.id },
            orderBy: { createdAt: "desc" },
            include: {
                recipient: {
                    include: {
                        profile: true,
                    },
                },
                sender: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        res.status(200).json({ donations: recievedDonations });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.recievedDonations = recievedDonations;
//# sourceMappingURL=recieved-donations.js.map