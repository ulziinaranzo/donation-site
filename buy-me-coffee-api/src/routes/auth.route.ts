import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { getMe } from "../controllers/auth/get-me";
import { signIn } from "../controllers/auth/signin";
import { signUpController } from "../controllers/auth/signup";
import { changePassword } from "../controllers/auth/change-password";

const authRouter = Router()
  .get("/auth/me", authenticationMiddleware, getMe)
  .post("/auth/signin", signIn)
  .post("/auth/signup", signUpController).put("/auth/change-password/:userId", changePassword)

export default authRouter;