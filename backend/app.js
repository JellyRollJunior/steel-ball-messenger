import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
    res.json('hello world!')
})

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));