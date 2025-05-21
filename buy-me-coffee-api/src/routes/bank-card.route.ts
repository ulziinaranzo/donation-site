import { Router } from "express";
import { createBankCard } from "../controllers/bank-account/create-bank-card";
import { getBankCard } from "../controllers/bank-account/get-bank-card";
import { updateBankCard } from "../controllers/bank-account/update-bank-card";

const bankCardRouter = Router();

bankCardRouter
  .post("/bank-card/:userId", createBankCard)
  .get("/bank-card/:userId", getBankCard)
  .put("/bank-card/:bankCardId", updateBankCard);

export default bankCardRouter;
