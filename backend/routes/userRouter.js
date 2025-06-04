import { Router } from "express";
import { userValidation } from "../validations/userValidations.js";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/", userValidation, userController.postUser);

export { userRouter };
