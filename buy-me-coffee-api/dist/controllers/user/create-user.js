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
exports.createUser = void 0;
const db_1 = require("../../db");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        const user = yield db_1.prisma.user.create({
            data: {
                email,
                password,
                username,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        res.status(201).json({ message: "Хэрэглэгч үүслээ", user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Хэрэглэгч үүсгэхэд алдаа гарлаа" });
    }
});
exports.createUser = createUser;
//# sourceMappingURL=create-user.js.map