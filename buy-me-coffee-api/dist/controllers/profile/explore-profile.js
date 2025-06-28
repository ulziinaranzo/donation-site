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
exports.exploreProfile = void 0;
const db_1 = require("../../db");
const exploreProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProfiles = yield db_1.prisma.profile.findMany({
            select: {
                name: true,
                about: true,
                avatarImage: true,
                socialMediaUrl: true,
                user: { select: {
                        username: true,
                    }
                }
            }
        });
        if (!allProfiles || allProfiles.length === 0) {
            res.status(404).json({ message: "Хэрэглэгч байхгүй байна" });
            return;
        }
        res.status(200).json({ message: "Амжилттай хэрэглэгчдийг авлаа", allProfiles });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, try again" });
    }
});
exports.exploreProfile = exploreProfile;
//# sourceMappingURL=explore-profile.js.map