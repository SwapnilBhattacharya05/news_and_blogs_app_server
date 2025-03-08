import { Router } from "express";
import { user } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/login", user);

export default userRouter;
