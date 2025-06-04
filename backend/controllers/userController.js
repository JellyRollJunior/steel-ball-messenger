import bcrypt from "bcryptjs";
import { ValidationError } from "../errors/ValidationError.js";
import { validationResult } from "express-validator";
import * as db from "../model/db.js";

const postUser = async (req, res, next) => {
    const validationErrors = validationResult(req);
    try {
        if (!validationErrors.isEmpty()) {
            throw new ValidationError(validationErrors.array());
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
