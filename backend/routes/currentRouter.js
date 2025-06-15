import { Router } from 'express';
import * as currentController from '../controllers/currentController.js';
import { authenticate } from '../middleware/token.js';
import { bioValidations } from '../validations/bioValidations.js';

const currentRouter = Router();

currentRouter.patch('/', authenticate, bioValidations, currentController.patchProfile)

export { currentRouter }