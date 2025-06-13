import { check } from "express-validator";

const EMPTY_ERROR = 'must not be empty.';
const LENGTH_ERROR = 'must be between 1 and 500 characters';
const messageValidations = [
    check('content').trim()
        .notEmpty().withMessage(`content ${EMPTY_ERROR}`)
        .isLength({ min: 1, max: 250 }).withMessage(`content ${LENGTH_ERROR}`),
]

export { messageValidations}