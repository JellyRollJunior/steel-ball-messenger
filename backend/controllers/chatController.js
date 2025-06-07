import * as db from '../model/db.js';

const postChat = async (req, res, next) => {
    try {
        const users = req.body.users;
        users.push(req.user);
        const chat = await db.createChat(users);
        res.json(chat);
    } catch (error) {
        next(error);
    }
};

export { postChat };
