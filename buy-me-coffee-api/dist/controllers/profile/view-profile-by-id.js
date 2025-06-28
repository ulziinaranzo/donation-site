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
exports.viewProfileById = void 0;
const db_1 = require("../../db");
const viewProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield db_1.prisma.user.findUnique({
            where: { id: Number(userId) },
            include: {
                profile: true,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Profile авахад алдаа гарлаа:", error);
        res.status(500).json({ message: "Серверийн алдаа" });
    }
});
exports.viewProfileById = viewProfileById;
//# sourceMappingURL=view-profile-by-id.js.map