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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const db_1 = require("../../db");
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        console.log("Getting user data for userId:", userId);
        if (!userId) {
            console.error("No userId found in request");
            res.status(401).json({ message: "User ID not found in token" });
            return;
        }
        const user = yield db_1.prisma.user.findUnique({
            where: { id: userId },
            include: {
                profile: true,
                bankCard: true,
            },
        });
        if (!user) {
            console.error("User not found in database for ID:", userId);
            res.status(404).json({ message: "User not found" });
            return;
        }
        console.log("User found successfully:", user.email);
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        console.error("Error in getMe:", error);
        res.status(500).json({
            message: "Сервер алдаа",
            error: process.env.NODE_ENV === "development" ? error : undefined,
        });
    }
});
exports.getMe = getMe;
//# sourceMappingURL=get-me.js.map