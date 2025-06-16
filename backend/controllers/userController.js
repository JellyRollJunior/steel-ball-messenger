import bcrypt from 'bcryptjs';
import { validateInput } from '../validations/validateInput.js';
import * as db from '../model/db.js';

const getUsers = async (req, res, next) => {
    try {
        const users = await db.getAllUsers();
        res.json({ users });
    } catch (error) {
        next(error);
    }
};

const postUser = async (req, res, next) => {
    try {
        validateInput(req);
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.createUser(username, hashedPassword);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        validateInput(req);
        const profileId = req.params.userId;
        const profile = await db.getProfile(profileId);
        res.json({
            bio: profile.bio,
            username: profile.user.username,
        });
    } catch (error) {
        next(error);
    }
};

export { getUsers, postUser, getProfile };
