import { Router } from "express";
import { createDonation } from "../controllers/donation/create-donation";
import { recievedDonations } from "../controllers/donation/recieved-donations";
import { totalEarningsFromDonations } from "../controllers/donation/total-earnings";
import { getDonationById } from "../controllers/donation/get-donation-by-id";

const donationRouter = Router();

donationRouter
  .post("/donation/create-donation", createDonation)
  .get("/donation/received/:username", recievedDonations)
  .get("/donation/total-earnings/:userId", totalEarningsFromDonations)
  .get("/donation/:donationId", getDonationById);
export default donationRouter;
