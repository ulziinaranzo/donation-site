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
exports.deleteUser = void 0;
const db_1 = require("../../db");
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id);
    try {
        const deletedUser = yield db_1.prisma.user.delete({ where: { id: userId } });
        res.json({ message: "Хэрэглэгч амжилттай устлаа" });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Устгахад алдаа гарлаа" });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=delete-user.js.map