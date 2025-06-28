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
exports.updateBankCard = void 0;
const db_1 = require("../../db");
const updateBankCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bankCardId = Number(req.params.bankCardId);
        const { expiryDate, firstName, lastName, country, cardNumber } = req.body;
        if (!bankCardId || isNaN(bankCardId)) {
            res.status(400).json({ message: "ID буруу байна" });
            return;
        }
        const updatedBankCard = yield db_1.prisma.bankCard.update({
            where: { id: bankCardId },
            data: {
                expiryDate,
                firstName,
                lastName,
                country,
                cardNumber,
                updatedAt: new Date(),
            },
        });
        res
            .status(200)
            .json({ message: "Амжилттай шинэчлэгдлээ", bankCard: updatedBankCard });
    }
    catch (error) {
        console.error(error);
        if (error.code === "P2025") {
            res.status(404).json({ message: "Мэдээлэл олдсонгүй" });
        }
    }
});
exports.updateBankCard = updateBankCard;
//# sourceMappingURL=update-bank-card.js.map