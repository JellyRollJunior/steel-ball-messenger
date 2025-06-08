import { Router } from 'express';
import { userValidation } from '../validations/userValidations.js';
import { authenticate } from '../middleware/token.js';
import * as userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', authenticate, userController.getUsers);
userRouter.post('/', userValidation, userController.postUser);

export { userRouter };
