import { validateInput } from '../validations/validateInput.js';
import * as db from '../model/db.js';

const getCurrent = async (req, res, next) => {
    try {
        validateInput(req);
        const profile = await db.getProfile(req.user.id);
        res.json({
            id: req.user.id,
            username: req.user.username,
            bio: profile.bio,
        });
    } catch (error) {
        next(error);
    }
};

const patchProfile = async (req, res, next) => {
    try {
        validateInput(req);
        const bio = req.body.bio;
        const profile = await db.updateProfile(req.user.id, bio);
        res.json({
            bio: profile.bio
        });
    } catch (error) {
        next(error);
    }
};

export { getCurrent, patchProfile };
