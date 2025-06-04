import * as db from "../model/db.js";
import bcrypt from 'bcryptjs';

const postUser = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await db.insertUser(username, hashedPassword);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export { postUser };
