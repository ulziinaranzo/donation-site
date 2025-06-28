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
exports.getBankCard = void 0;
const db_1 = require("../../db");
const getBankCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const bankCard = yield db_1.prisma.user.findFirst({
            where: { id: userId },
            include: {
                bankCard: true,
            },
        });
        if (!userId || isNaN(userId)) {
            res.status(400).json({ message: "ID буруу байна" });
            return;
        }
        res.status(200).json({
            bankCard,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Серверийн алдаа гарлаа" });
    }
});
exports.getBankCard = getBankCard;
//# sourceMappingURL=get-bank-card.js.map