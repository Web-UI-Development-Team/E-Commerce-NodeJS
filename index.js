require('dotenv').config();
require('./db');

const express = require("express");

const app = express();

app.use(express.json());

const port = parseInt(process.env.PORT);

const userRouter= require("./routes/user.router");

const productRouter = require('./routes/products.router');

const stripeRouter = require("./routes/stripe.router");

const adminRouter = require('./routes/admin.router');

const auth = require('./middleware/auth');

const admin = require('./middleware/admin');

app.use("/api/v1/users",userRouter);

app.use(auth);

app.use('/api/v1/products/', productRouter);

app.use('/api/v1/stripe', stripeRouter);

app.use(admin);

app.use('/api/v1/admin/', adminRouter);

app.listen(port, () => {
    console.log(`Connected on port ${port}...`);
});