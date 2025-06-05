import { Router } from 'express';
import { userValidation } from '../validations/userValidations.js';
import * as loginController from '../controllers/loginController.js';

const loginRouter = Router();

loginRouter.post('/', userValidation, loginController.postLogin);

export { loginRouter };
