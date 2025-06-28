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
exports.updateProfile = void 0;
const db_1 = require("../../db");
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        res.status(400).json({ message: "Зөв хэрэглэгчийн ID илгээнэ үү" });
        return;
    }
    const { avatarImage, about, name, socialMediaUrl, backgroundImage, successMessage, } = req.body;
    try {
        const user = yield db_1.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
            return;
        }
        const existingProfile = yield db_1.prisma.profile.findUnique({
            where: { userId },
        });
        if (existingProfile && name && existingProfile.name !== name) {
            const nameExists = yield db_1.prisma.profile.findFirst({
                where: { name },
            });
            if (nameExists) {
                res
                    .status(400)
                    .json({ message: "Энэ нэр аль хэдийн бүртгэлтэй байна" });
                return;
            }
        }
        let updatedProfile;
        if (existingProfile) {
            updatedProfile = yield db_1.prisma.profile.update({
                where: { userId },
                data: {
                    avatarImage,
                    about,
                    name,
                    socialMediaUrl,
                    backgroundImage,
                    successMessage,
                },
            });
        }
        else {
            updatedProfile = yield db_1.prisma.profile.create({
                data: {
                    avatarImage,
                    about,
                    name,
                    socialMediaUrl,
                    backgroundImage,
                    successMessage,
                    user: {
                        connect: { id: userId },
                    },
                },
            });
        }
        res.status(200).json({
            message: "Амжилттай хэрэглэгчийн профайлыг шинэчлэлээ",
            updatedProfile,
        });
        return;
    }
    catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Серверийн алдаа, дахин оролдоно уу" });
        return;
    }
});
exports.updateProfile = updateProfile;
//# sourceMappingURL=update-profile.js.map