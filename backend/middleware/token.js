import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const retrieveTokenFromHeader = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        req.token = token;
        next();
    } else {
        const error = new Error('Authorization token not found.');
        error.statusCode = 403;
        next(error);
    }
};

const verifyToken = (req, res, next) => {
    try {
        const data = jwt.verify(req.token, process.env.TOKEN_SECRET);
        req.user = data;
        next();
    } catch (err) {
        const error = new Error('Invalid or expired token.');
        error.statusCode = 403;
        next(error);
    }
};

const authenticate = [retrieveTokenFromHeader, verifyToken];

export { authenticate };
