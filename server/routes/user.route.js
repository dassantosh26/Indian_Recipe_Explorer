/** @format */

import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/logout", logoutUser);

export default userRouter;
