import { Router } from "express";
import { getMe } from "../controllers/auth/get-me";
import { signIn } from "../controllers/auth/signin";
import { signUpController } from "../controllers/auth/signup";
import { changePassword } from "../controllers/auth/change-password";
import { checkUsername } from "../controllers/auth/check-username";
import { authMiddleware } from "../middlewares/authentication-middleware";

const authRouter = Router()
  .get("/auth/me", authMiddleware, getMe)
  .post("/auth/signin", signIn)
  .post("/auth/signup", signUpController)
  .put("/auth/change-password/:userId", authMiddleware, changePassword)
  .get("/auth/check-username", checkUsername);

export default authRouter;
