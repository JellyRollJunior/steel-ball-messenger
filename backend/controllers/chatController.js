import { validationResult } from 'express-validator';
import * as db from '../model/db.js';
import { ValidationError } from '../errors/ValidationError.js';

const postChat = async (req, res, next) => {
    const validationErrors = validationResult(req);
    try {
        if (!validationErrors.isEmpty()) {
            throw new ValidationError(validationErrors.array());
        }
        const users = req.body.users;
        users.push(req.user);
        const chat = await db.createChat(users);
        res.json(chat);
    } catch (error) {
        next(error);
    }
};

export { postChat };
