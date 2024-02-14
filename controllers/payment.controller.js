//const { default: Stripe } = require('stripe');
//const createCheckoutSession = require('../controllers/payment.controller');
//const stripe = require('stripe')(process.env.STRIPE_SECRET);
//require("dotenv").config();
const createCheckoutSessionservices = require("../services/payment.service")

const createCheckoutSession = async(req,res)=>{
    try{
        //createCheckoutSessionservices
        const session = await createCheckoutSessionservices(req,res);
        res.send(session);
    }
    catch(error){
        console.error(error);
        res.status(500).send({ message: 'Failed to create checkout session' });
    }
}

module.exports = createCheckoutSession;