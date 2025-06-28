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
exports.getUserByUsername = void 0;
const db_1 = require("../../db");
const getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    if (!username) {
        res.status(400).json({ message: "Username оруулна уу" });
        return;
    }
    try {
        const user = yield db_1.prisma.user.findUnique({
            where: { username },
            include: {
                profile: true,
            },
        });
        if (!user) {
            res.status(400).json({ message: "Хэрэглэгч олдсонгүй" });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error try again" });
    }
});
exports.getUserByUsername = getUserByUsername;
//# sourceMappingURL=get-user-by-username.js.map