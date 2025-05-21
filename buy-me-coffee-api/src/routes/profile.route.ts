import { Router } from "express";
import { createProfile } from "../controllers/profile/create-profile";

const profileRouter = Router();

profileRouter.post("/profile/:username", createProfile);

export default profileRouter;
