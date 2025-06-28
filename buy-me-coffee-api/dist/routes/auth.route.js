"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication-middleware");
const get_me_1 = require("../controllers/auth/get-me");
const signin_1 = require("../controllers/auth/signin");
const signup_1 = require("../controllers/auth/signup");
const change_password_1 = require("../controllers/auth/change-password");
const check_username_1 = require("../controllers/auth/check-username");
const authRouter = (0, express_1.Router)()
    .get("/auth/me", authentication_middleware_1.authenticateToken, get_me_1.getMe)
    .post("/auth/signin", signin_1.signIn)
    .post("/auth/signup", signup_1.signUpController)
    .put("/auth/change-password/:userId", authentication_middleware_1.authenticateToken, change_password_1.changePassword)
    .get("/auth/check-username", check_username_1.checkUsername);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map