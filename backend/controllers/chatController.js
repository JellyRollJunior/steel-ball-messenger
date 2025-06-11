import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/ValidationError.js';
import * as db from '../model/db.js';

const validateInput = (req) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        throw new ValidationError(validationErrors.array());
    }
};

const getChats = async (req, res, next) => {
    try {
        const chats = await db.getAllChats(req.user.id);
        res.json({ chats });
    } catch (error) {
        next(error);
    }
};

const postChats = async (req, res, next) => {
    try {
        validateInput(req);
        const users = req.body.users;
        users.push(req.user);
        const chat = await db.createChat(users);
        res.json(chat);
    } catch (error) {
        next(error);
    }
};

const getChatMessages = async (req, res, next) => {
    try {
        validateInput(req);
        const userId = req.user.id;
        const chatId = req.params.chatId;
        const chat = await db.getChatMessages(userId, chatId);
        res.json(chat);
    } catch (error) {
        next(error);
    }
};

const postChatMessages = async (req, res, next) => {
    try {
        validateInput(req);
        const chatId = req.params.chatId;
        const senderId = req.user.id;
        const content = req.body.content;
        const message = await db.createMessage(chatId, senderId, content);
        res.json(message);
    } catch (error) {
        next(error);
    }
};

export { getChats, postChats, getChatMessages, postChatMessages };
