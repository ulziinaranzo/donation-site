"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_user_1 = require("../controllers/user/create-user");
const get_user_1 = require("../controllers/user/get-user");
const get_users_1 = require("../controllers/user/get-users");
const update_user_1 = require("../controllers/user/update-user");
const delete_user_1 = require("../controllers/user/delete-user");
const get_user_by_username_1 = require("../controllers/user/get-user-by-username");
const userRouter = (0, express_1.Router)();
userRouter
    .post("/user", create_user_1.createUser)
    .get("/user/:id", get_user_1.getUserController)
    .get("/user", get_users_1.getUsersController)
    .put("/user/:id", update_user_1.updateUserController)
    .delete("/user/:id", delete_user_1.deleteUser)
    .get("/user/username/:username", get_user_by_username_1.getUserByUsername);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map