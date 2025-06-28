"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_profile_1 = require("../controllers/profile/create-profile");
const view_profile_1 = require("../controllers/profile/view-profile");
const explore_profile_1 = require("../controllers/profile/explore-profile");
const update_profile_1 = require("../controllers/profile/update-profile");
const get_user_1 = require("../controllers/user/get-user");
const profileRouter = (0, express_1.Router)();
profileRouter.post("/profile/:username", create_profile_1.createProfile);
profileRouter.get("/profile/view/:username", view_profile_1.viewUser);
profileRouter.get("/profile/explore", explore_profile_1.exploreProfile);
profileRouter.put("/profile/:userId", update_profile_1.updateProfile);
profileRouter.get("/profile/id/:id", get_user_1.getUserController);
exports.default = profileRouter;
//# sourceMappingURL=profile.route.js.map