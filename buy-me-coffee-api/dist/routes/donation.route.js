"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_donation_1 = require("../controllers/donation/create-donation");
const recieved_donations_1 = require("../controllers/donation/recieved-donations");
const total_earnings_1 = require("../controllers/donation/total-earnings");
const donationRouter = (0, express_1.Router)();
donationRouter
    .post("/donation/create-donation", create_donation_1.createDonation)
    .get("/donation/received/:username", recieved_donations_1.recievedDonations)
    .get("/donation/total-earnings/:userId", total_earnings_1.totalEarningsFromDonations);
exports.default = donationRouter;
//# sourceMappingURL=donation.route.js.map