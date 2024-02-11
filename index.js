require('dotenv').config();
require('./database');

const express = require("express");

const bookRouter = require('./routes/books.router');
const userRouter = require('./routes/users.router');
const auth = require('./middleware/auth');

const app = express();
const port = parseInt(process.env.PORT);

app.use(express.json());

app.use(express.static("public"));

app.use('/api/v1/users', userRouter);

app.set('view engine', 'ejs');

app.set('views','views');

app.use(auth);

app.use('/api/v1/books', bookRouter);

app.listen(port, () => {
    console.log(`Connected on port ${port}...`);
});