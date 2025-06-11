import { Router } from 'express';
import { authenticate } from '../middleware/token.js';
import { chatIdValidations } from '../validations/chatIdValidations.js';
import { chatValidation } from '../validations/chatValidations.js';
import { messageValidations } from '../validations/messageValidation.js';
import * as chatController from '../controllers/chatController.js';

const chatRouter = Router();

chatRouter.get('/', authenticate, chatController.getChats);
chatRouter.post('/', authenticate, chatValidation, chatController.postChats);

chatRouter.get('/:chatId', authenticate, chatIdValidations, chatController.getChatMessages);
chatRouter.post('/:chatId/messages', authenticate, chatIdValidations, messageValidations, chatController.postChatMessages);

export { chatRouter };
