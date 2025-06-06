import { Router } from "express";
import { createProfile } from "../controllers/profile/create-profile";
import { viewUser } from "../controllers/profile/view-profile";
import { exploreProfile } from "../controllers/profile/explore-profile";
import { updateProfile } from "../controllers/profile/update-profile";
import { viewProfileById } from "../controllers/profile/view-profile-by-id";
import { getUserController } from "../controllers/user/get-user";

const profileRouter = Router();

profileRouter.post("/profile/:username", createProfile);
profileRouter.get("/profile/view/:username", viewUser);
profileRouter.get("/profile/explore", exploreProfile);
profileRouter.put("/profile/:userId", updateProfile);
profileRouter.get("/profile/id/:id", getUserController);

export default profileRouter;
