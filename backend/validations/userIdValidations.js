import { check } from 'express-validator';

const INT_ERROR = 'must be an integer.';

const userIdValidations = [
    check('userId').isInt().withMessage(`user id ${INT_ERROR}`),
];

export { userIdValidations };
