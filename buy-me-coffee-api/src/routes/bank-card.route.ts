import { Router } from "express";
import { createBankCard } from "../controllers/bank-card/create-bank-card";
import { getBankCard } from "../controllers/bank-card/get-bank-card";
import { updateBankCard } from "../controllers/bank-card/update-bank-card";

const bankCardRouter = Router();

bankCardRouter
  .post("/bank-card/:userId", createBankCard)
  .get("/bank-card/:userId", getBankCard)
  .put("/bank-card/:bankCardId", updateBankCard);

export default bankCardRouter;
