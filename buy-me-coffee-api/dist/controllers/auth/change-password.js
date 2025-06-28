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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = void 0;
const db_1 = require("../../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        res.status(400).json({ message: "Хэрэглэгчийн ID буруу байна" });
        return;
    }
    const { newPassword, currentPassword } = req.body;
    try {
        const user = yield db_1.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: "Ийм хэрэглэгч байхгүй байна" });
            return;
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            res.status(401).json({ message: "Хуучин нууц үг буруу байна" });
            return;
        }
        const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 10);
        const updatedPassword = yield db_1.prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedNewPassword,
                updatedAt: new Date()
            }
        });
        res.status(200).json({ message: "Нууц амжилттай солигдлоо" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, try again" });
    }
});
exports.changePassword = changePassword;
//# sourceMappingURL=change-password.js.map