require('dotenv').config(); 
require('./db');

const express = require("express");

const app = express();

app.use(express.json()); 

const port = parseInt(process.env.PORT);

const productRouter = require('./routes/products.router');

const adminRouter = require('./routes/admin.router');

const admin = require('./middleware/admin');

app.use('/api/v1/products/', productRouter);

app.use(admin);

app.use('/api/v1/admin/', adminRouter);

app.listen(port, () => {
    console.log(`Connected on port ${port}...`);
});