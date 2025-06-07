import { Router } from 'express';
import { authenticate } from '../middleware/token.js';
import { chatValidation } from '../validations/chatValidations.js';
import * as chatController from '../controllers/chatController.js';

const chatRouter = Router();

chatRouter.post('/', authenticate, chatValidation, chatController.postChat);

export { chatRouter };
