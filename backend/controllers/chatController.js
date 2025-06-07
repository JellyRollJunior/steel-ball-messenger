import * as db from '../model/db.js';

const postChat = async (req, res, next) => {
    try {

        res.json('this is a chat!')
    } catch (error) {
        next(error);
    }
};

export { postChat };
