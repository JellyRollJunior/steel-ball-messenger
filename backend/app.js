import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRouter.js';

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.json('hello world!')
})
app.use('/users', userRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));