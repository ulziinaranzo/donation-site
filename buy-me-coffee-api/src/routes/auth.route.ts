import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { getMe } from "../controllers/auth/get-me";
import { signIn } from "../controllers/auth/signin";
import { signUpController } from "../controllers/auth/signup";

const authRouter = Router()
  .get("/auth/me", authenticationMiddleware, getMe)
  .post("/auth/signin", signIn)
  .post("/auth/signup", signUpController);

export default authRouter;