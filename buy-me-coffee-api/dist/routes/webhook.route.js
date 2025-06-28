"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRouter = void 0;
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const handle_stripe_1 = require("../controllers/webhook/handle-stripe");
exports.webhookRouter = (0, express_1.Router)();
exports.webhookRouter.post("/stripe", express_2.default.raw({ type: "application/json" }), handle_stripe_1.handleStripe);
exports.default = exports.webhookRouter;
//# sourceMappingURL=webhook.route.js.map