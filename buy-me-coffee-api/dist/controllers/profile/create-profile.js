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
exports.createProfile = void 0;
const db_1 = require("../../db");
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    if (!username || typeof username !== "string") {
        res.status(400).json({ message: "username буруу" });
        return;
    }
    const { name, about, avatarImage, socialMediaUrl } = req.body;
    if (!name || !about || !socialMediaUrl) {
        res
            .status(400)
            .json({ message: "Нэр, тухай болон социал хуудас шаардлагатай" });
        return;
    }
    try {
        const user = yield db_1.prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
            return;
        }
        const profile = yield db_1.prisma.profile.upsert({
            where: { userId: user.id },
            update: {
                name,
                about,
                avatarImage: avatarImage || null,
                socialMediaUrl,
            },
            create: {
                name,
                about,
                avatarImage: avatarImage || null,
                socialMediaUrl,
                userId: user.id,
            },
        });
        const updatedUser = yield db_1.prisma.user.findUnique({
            where: { username: username },
            include: {
                profile: true,
                bankCard: true,
            },
        });
        res.status(201).json({
            message: "Хэрэглэгчийн profile амжилттай хадгалагдлаа",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("Profile үүсгэхэд алдаа:", error.message || error);
        res.status(500).json({
            message: "Profile үүсгэхэд алдаа гарлаа",
            error: error.message || String(error),
        });
    }
});
exports.createProfile = createProfile;
//# sourceMappingURL=create-profile.js.map