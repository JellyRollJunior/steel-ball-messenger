import { Router } from 'express';
import { authenticate } from '../middleware/token.js';
import * as chatController from '../controllers/chatController.js';

const chatRouter = Router();

chatRouter.post('/', authenticate, chatController.postChat);

export { chatRouter };
