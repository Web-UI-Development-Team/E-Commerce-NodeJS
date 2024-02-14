const express = require('express');
const router = express.Router();
//const { default: Stripe } = require('stripe');
const createCheckoutSession = require('../controllers/payment.controller');
//const stripe = require('stripe')(process.env.STRIPE_SECRET);
//require("dotenv").config();


router.post('/create-checkout-session', createCheckoutSession)
// router.post('/create-checkout-session',async(req,res)=>{
//     try{
//         const session = await stripe.checkout.sessions.create({
//         line_items:[
//             {
//                 price_data:{
//                     currency:'USD',
//                     product_data:{
//                         name:'T-shirt',
//                     },
//                     unit_amount:2000,
//                 },
//                 quantity:1,
//             }
//         ],
//         mode:'payment',
//         success_url:`${req.protocol}://${req.get('host')}/checkout-success?success=true`,
//         cancel_url:`${req.protocol}://${req.get('host')}/cart?canceled=true`,
//     })
//     res.send({url:session.url});
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send({ message: 'Failed to create checkout session' });
//     }
// })

module.exports =router;