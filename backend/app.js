import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRouter.js';
import { loginRouter } from './routes/loginRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.json('hello world!');
});
app.use('/users', userRouter);
app.use('/login', loginRouter);

// error handler
app.use((error, req, res, next) => {
    if (error.statusCode) {
        return res.status(error.statusCode).json({
            ...error,
            message: error.message,
        });
    }
    res.status(500).json(error);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
