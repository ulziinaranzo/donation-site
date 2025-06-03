import { Router } from "express";
import { handleStripe } from "../controllers/webhook/handle-stripe";

export const webhookRouter = Router();
webhookRouter.post("/stripe", handleStripe);

export default webhookRouter;
