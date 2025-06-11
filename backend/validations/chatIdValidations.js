import { check } from 'express-validator';

const INT_ERROR = 'must be an integer.';

const chatIdValidations = [
    check('chatId').isInt().withMessage(`chat id: ${INT_ERROR}`),
];

export { chatIdValidations };
