import { check } from 'express-validator';

const EMPTY_ERROR = 'must not be empty.';
const LENGTH_ERROR = 'must be between 6 and 24 characters';
const userValidation = [
    check('username').trim()
        .notEmpty().withMessage(`Username ${EMPTY_ERROR}`)
        .isLength({ min: 6, max: 24 }).withMessage(`Username ${LENGTH_ERROR}`),
    check('password').trim()
        .notEmpty().withMessage(`Password ${EMPTY_ERROR}`)
        .isLength({ min: 6, max: 24 }).withMessage(`Password ${LENGTH_ERROR}`),
];

export { userValidation };
