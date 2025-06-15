import * as db from '../model/db.js';

const patchProfile = async (req, res, next) => {
    try {
        validateInput(req);
        const bio = req.body.bio;
        const profile = await db.updateProfile(req.user.id, bio);
        res.json(profile);
    } catch (error) {
        next(error)
    }
}

export { patchProfile }