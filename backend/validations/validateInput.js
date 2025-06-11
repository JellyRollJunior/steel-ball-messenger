import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/ValidationError.js';

const validateInput = (req) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        throw new ValidationError(validationErrors.array());
    }
};

export { validateInput };
