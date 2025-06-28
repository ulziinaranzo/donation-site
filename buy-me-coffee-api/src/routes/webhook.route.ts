import { Router } from "express";
import express from "express";
import { handleStripe } from "../controllers/webhook/handle-stripe";

export const webhookRouter = Router();

webhookRouter.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  handleStripe
);

export default webhookRouter;
