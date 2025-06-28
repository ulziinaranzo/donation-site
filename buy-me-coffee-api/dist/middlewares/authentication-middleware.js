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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Token олдсонгүй" });
            return;
        }
        const token = authHeader.substring(7);
        if (!token) {
            res.status(401).json({ message: "Token олдсонгүй" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_NUUTS);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.error("Auth middleware error:", error);
        res.status(401).json({ message: "Token буруу байна" });
    }
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authentication-middleware.js.map