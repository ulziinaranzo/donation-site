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
exports.viewUser = void 0;
const db_1 = require("../../db");
const viewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        if (!username || typeof username !== "string") {
            res.status(400).json({ message: "Хэрэглэгч байхгүй байна" });
            return;
        }
        const user = yield db_1.prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                profile: {
                    select: {
                        name: true,
                        about: true,
                        avatarImage: true,
                        socialMediaUrl: true,
                        backgroundImage: true,
                    },
                },
            },
        });
        if (!user || !user.profile) {
            res.status(404).json({ message: "Профайл олдсонгүй" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Серверийн алдаа" });
    }
});
exports.viewUser = viewUser;
//# sourceMappingURL=view-profile.js.map