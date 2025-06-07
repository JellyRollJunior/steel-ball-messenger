import { check } from "express-validator";

const ARRAY_ERROR = 'must be an array of user ids.';
const INT_ERROR = 'must be an integer.';
const chatValidation = [
    check('users')
        .isArray().withMessage(`users: ${ARRAY_ERROR}`),
    check('users.*.id')
        .isInt().withMessage(`user id: ${INT_ERROR}`),
]

export { chatValidation }