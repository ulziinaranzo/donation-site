"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_bank_card_1 = require("../controllers/bank-card/create-bank-card");
const get_bank_card_1 = require("../controllers/bank-card/get-bank-card");
const update_bank_card_1 = require("../controllers/bank-card/update-bank-card");
const bankCardRouter = (0, express_1.Router)();
bankCardRouter
    .post("/bank-card/:userId", create_bank_card_1.createBankCard)
    .get("/bank-card/:userId", get_bank_card_1.getBankCard)
    .put("/bank-card/:bankCardId", update_bank_card_1.updateBankCard);
exports.default = bankCardRouter;
//# sourceMappingURL=bank-card.route.js.map