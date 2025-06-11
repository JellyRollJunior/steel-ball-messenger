import { Router } from 'express';
import { authenticate } from '../middleware/token.js';
import { chatIdValidations } from '../validations/chatIdValidations.js';
import { chatValidation } from '../validations/chatValidations.js';
import * as chatController from '../controllers/chatController.js';

const chatRouter = Router();

chatRouter.get('/', authenticate, chatController.getChats);
chatRouter.post('/', authenticate, chatValidation, chatController.postChats);

chatRouter.get('/:chatId', authenticate, chatIdValidations, chatController.getChatMessages);
chatRouter.post('/:chatId/messages', authenticate, chatIdValidations, chatController.postChatMessages);

export { chatRouter };
