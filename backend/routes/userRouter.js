import { Router } from 'express';
import { authenticate } from '../middleware/token.js';
import { userValidation } from '../validations/userValidations.js';
import { userIdValidations } from '../validations/userIdValidations.js';
import { bioValidations } from '../validations/bioValidations.js';
import * as userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', authenticate, userController.getUsers);
userRouter.post('/', userValidation, userController.postUser);

// profiles
userRouter.get(
    '/:userId/profiles',
    userIdValidations,
    userController.getProfile
);
userRouter.patch(
    '/',
    authenticate,
    bioValidations,
    userController.patchProfile
);

export { userRouter };
