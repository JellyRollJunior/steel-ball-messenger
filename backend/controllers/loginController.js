import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import { AuthenticationError } from '../errors/AuthenticationError.js';
import * as db from '../model/db.js';
dotenv.config();

const postLogin = async (req, res, next) => {
    const validationErrors = validationResult(req);
    try {
        if (!validationErrors.isEmpty()) throw new AuthenticationError();
        // authenticate user credentials
        const username = req.body.username;
        const password = req.body.password;
        const user = (await db.getUsers({ username }))[0];
        if (!user) throw new AuthenticationError();
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new AuthenticationError();

        // sign token with user info
        const options = { expiresIn: 60 * 60 * 2 }; // 2 hours
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.TOKEN_SECRET,
            options
        );
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

export { postLogin };
