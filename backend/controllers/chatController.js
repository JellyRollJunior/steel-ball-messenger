import * as db from '../model/db.js';

const postChat = async (req, res, next) => {
    try {
        // current user
        // added users
        const users = req.body.users;
        const chat = await db.createChat(users);
        res.json(chat);
    } catch (error) {
        next(error);
    }
};
