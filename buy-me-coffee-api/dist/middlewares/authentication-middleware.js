"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access token шаардлагатай" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_NUUTS);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.error("JWT verification error:", error);
        res.status(403).json({ message: "Token буруу эсвэл хүчингүй байна" });
        return;
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authentication-middleware.js.map