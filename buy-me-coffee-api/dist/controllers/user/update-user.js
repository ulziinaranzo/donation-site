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
exports.updateUserController = void 0;
const db_1 = require("../../db");
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const { email, password, username } = req.body;
        if (!userId) {
            res.status(400).json({ message: "Энэ хэрэглэгч байхгүй байна" });
            return;
        }
        const updatedUser = yield db_1.prisma.user.update({
            where: { id: userId },
            data: { email, password, username, updatedAt: new Date() },
            include: {
                bankCard: true,
                profile: true,
            },
        });
        res.status(200).json({ message: "Амжилттай солилоо", user: updatedUser });
        return;
    }
    catch (error) {
        console.error(error);
        if (error.code === "P2025") {
            res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
            return;
        }
    }
});
exports.updateUserController = updateUserController;
//# sourceMappingURL=update-user.js.map