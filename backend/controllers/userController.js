import * as db from "../model/db.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

const postUser = async (req, res, next) => {
    const validationErrors = validationResult(req);
    try {
        if (!validationErrors.isEmpty()) {
            res.json(validationErrors.array());
            return;
        }
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.insertUser(username, hashedPassword);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export { postUser };
