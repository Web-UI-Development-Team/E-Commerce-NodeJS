require("dotenv").config();
require("./db");
require("mongoose");

const cors = require("cors");

const express = require("express");

const app = express();

const path = require('path');

app.use(express.json());

app.use(cors());

const port = parseInt(process.env.PORT);

const userRouter = require("./routes/user.router");

const profileRouter = require("./routes/profile.router");

const productRouter = require("./routes/product.router");

const stripeRouter = require("./routes/stripe.router");

const adminRouter = require("./routes/admin.router");

const orderRouter = require("./routes/order.router");

const cartRouter = require("./routes/cart.router");

const categoryRouter = require("./routes/category.router");

const editRouter = require("./routes/edit.router");

const reviewRouter = require("./routes/review.router");

const ratingRouter = require("./routes/rating.router");

const auth = require("./middleware/auth.middleware");

const admin = require("./middleware/admin.middleware");

app.use('/images', express.static(path.join('images')))

app.use("/api/v1/users", userRouter);

app.use("/api/v1/products", productRouter, reviewRouter, ratingRouter);

app.use("/api/v1/categories", categoryRouter);

app.use("/edit", editRouter);

app.use(auth);

app.use("/api/v1/profile", profileRouter,);

app.use("/api/v1/cart/", cartRouter);

app.use("/api/v1/orders/", orderRouter);

app.use("/api/v1/stripe", stripeRouter);

app.use(admin);

app.use("/api/v1/admin/", adminRouter);

app.listen(port, () => {
  console.log(`Connected on port ${port}...`);
});
