import { validationResult } from 'express-validator';
import { AuthenticationError } from '../errors/AuthenticationError.js';
import * as db from '../model/db.js';
import bcrypt from 'bcryptjs';

const postLogin = async (req, res, next) => {
    const validationErrors = validationResult(req);
    try {
        if (!validationErrors.isEmpty()) {
            throw new AuthenticationError();
        }
        const username = req.body.username;
        const password = req.body.password;

        const user = (await db.getUsers({ username }))[0];
        if (!user) {
            throw new AuthenticationError();
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new AuthenticationError();
        }
        res.json('sucessful authentication for ' + user.username);
    } catch (error) {
        next(error);
    }
};

export { postLogin };
