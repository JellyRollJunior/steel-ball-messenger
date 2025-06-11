import { Router } from 'express';
import { authenticate } from '../middleware/token.js';
import { chatIdValidations } from '../validations/chatIdValidations.js';
import { chatValidation } from '../validations/chatValidations.js';
import * as chatController from '../controllers/chatController.js';

const chatRouter = Router();

chatRouter.get('/', authenticate, chatController.getChats);
chatRouter.get('/:chatId', authenticate, chatIdValidations, chatController.getChatMessages);
chatRouter.post('/', authenticate, chatValidation, chatController.postChats);

export { chatRouter };
