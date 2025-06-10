import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/ValidationError.js';
import * as db from '../model/db.js';

const getChats = async (req, res, next) => {
    try {
        const chats = await db.getAllChats(req.user.id);
        res.json({ chats });
    } catch (error) {
        next(error);
    }
};

const postChats = async (req, res, next) => {
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

export { getChats, postChats };
