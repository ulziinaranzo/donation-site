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
exports.createBankCard = void 0;
const db_1 = require("../../db");
const createBankCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    if (!userId || isNaN(userId)) {
        res.status(400).json({ message: "ID буруу" });
        return;
    }
    const { country, firstName, lastName, cardNumber, expiryDate, cvc } = req.body;
    if (!country || !firstName || !lastName || !cardNumber || !expiryDate || !cvc) {
        res.status(400).json({ message: "Мэдээлэл дутуу байна" });
        return;
    }
    try {
        const bankCard = yield db_1.prisma.bankCard.upsert({
            where: {
                userId: userId,
            },
            update: {
                country,
                firstName,
                lastName,
                cardNumber,
                expiryDate,
                cvc,
            },
            create: {
                country,
                firstName,
                lastName,
                cardNumber,
                expiryDate,
                cvc,
                user: { connect: { id: userId } },
            },
        });
        res.status(201).json({ message: "Банкны карт нэмэгдлээ", bankCard });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Банкны карт нэмэхэд алдаа гарлаа" });
    }
});
exports.createBankCard = createBankCard;
//# sourceMappingURL=create-bank-card.js.map