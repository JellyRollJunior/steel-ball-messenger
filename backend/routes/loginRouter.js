import * as loginController from '../controllers/loginController.js';
import { Router } from 'express';

const loginRouter = Router();

loginRouter.post('/', loginController.postLogin);

export { loginRouter };
