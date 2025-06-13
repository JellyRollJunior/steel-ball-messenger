import { check } from 'express-validator';

const EMPTY_ERROR = 'must not be empty.';
const LENGTH_ERROR = 'must be between 1 and 500 characters';
const bioValidations = [
    check('bio').trim()
        .notEmpty().withMessage(`bio ${EMPTY_ERROR}`)
        .isLength({ min: 1, max: 500 }).withMessage(`bio ${LENGTH_ERROR}`),
]

export { bioValidations }