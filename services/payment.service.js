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
  const id = req.body._id;
  console.log(id);
  try {
    const orders = await Order.findOne({ _id: id });
    console.log(orders);
    //console.log(orders)
    //console.log(orders.user);
    //console.log(orders.orderItems)
    const productItems = [];
    for (const product of orders.orderItems) {
      console.log("this is product loop", product);
      //console.log(product.product);
      //console.log(product.quantity);
      const productData = await Product.find({ title: product.title })
        .then((data) => {
          console.log("this is data", data);
          console.log("this is pro data title ", data[0].title);
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
      //productItems.push({title:productData.title, price:productData.price,quantity:product.quantity});
    }
    const user = await User.findOne({ _id: orders.user });
    console.log(user.email);
    //console.log(productItems)
    // const stripe = Stripe(process.env.STRIPE_SECRET);
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
