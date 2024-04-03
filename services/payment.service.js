const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51OjlkiLU2GVsNa9sIJxwreRKUbxshPAkuSYRLMxctI9WlmiNHGtQWmbNWvUU5TyxnAXubF1jPPkSrudrz3DoI72T00pJjOt0sg"
);
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
//const stripe = require('stripe')(process.env.STRIPE_SECRET);
require("dotenv").config();

const createCheckoutSessionservices = async (req, res) => {
  const id = req.body.orderId;

  try {
    const orders = await Order.findOne({ _id: id });

    const productItems = [];
    for (const product of orders.orderItems) {
      const productData = await Product.find({ title: product.title })
        .then((data) => {

          productItems.push({
            price_data: {
              currency: "USD",
              product_data: {
                name: data[0].title,
              },
              unit_amount: product.price * 100, // Assuming price is in cents
            },
            quantity: product.quantity,
          });
        })
        .catch((err) => {
          console.log("this is error", err);
        });
    }
    const user = await User.findOne({ _id: orders.user });

    const session = await stripe.checkout.sessions.create({
      line_items: productItems,
      mode: "payment",
      customer_email: user.email,
      success_url: `${req.protocol}://${req.get(
        "host"
      )}/checkout-success?success=true`,
      cancel_url: `${req.protocol}://${req.get("host")}/cart?canceled=true`,
    });
    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to create checkout session" });
  }
};

module.exports = createCheckoutSessionservices;
