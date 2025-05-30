import { Router } from "express";
import { createProfile } from "../controllers/profile/create-profile";
import { viewCurrentProfile } from "../controllers/profile/view-current-profile";
import { viewUser } from "../controllers/profile/view-profile";
import { exploreProfile } from "../controllers/profile/explore-profile";
import { updateProfile } from "../controllers/profile/update-profile";
import { viewProfileById } from "../controllers/profile/view-profile-by-id";

const profileRouter = Router();

profileRouter.post("/profile/:username", createProfile);

profileRouter.get("/profile/view/:username", viewUser);
profileRouter.get("/profile/explore", exploreProfile);
profileRouter.get("/profile/current-user", viewCurrentProfile);
profileRouter.put("/profile/:userId", updateProfile);
// profileRouter.get("/profile/id/:userId", viewProfileById);

export default profileRouter;
