import * as db from "../model/db.js";

const postUser = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await db.insertUser(username, password);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export { postUser };
