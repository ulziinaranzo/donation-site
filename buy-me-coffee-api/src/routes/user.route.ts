import { Router } from "express";
import { createUser } from "../controllers/user/create-user";
import { getUserController } from "../controllers/user/get-user";
import { getUsersController } from "../controllers/user/get-users";
import { updateUserController } from "../controllers/user/update-user";
import { deleteUser } from "../controllers/user/delete-user";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { getUserByUsername } from "../controllers/user/get-user-by-username";

const userRouter = Router();

userRouter
  .post("/user", createUser)
  .get("/user/:id", getUserController)
  .get("/user", getUsersController)
  .put("/user/:id", authenticationMiddleware, updateUserController)
  .delete("/user/:id", deleteUser)
  .get("/user/username/:username", getUserByUsername);

export default userRouter;
