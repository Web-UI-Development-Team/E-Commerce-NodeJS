const express=require('express');
const { getAllOrders, getSpecificOrder, newOrder, cancelOrder } = require('../controllers/order.controller');
const auth=require('../middleware/auth')
const admin=require('../middleware/admin')

const router=express.Router();

router.get('/', auth, admin, getAllOrders);

router.get('/:id', getSpecificOrder);

router.patch('/:id/cancel' , cancelOrder);

router.post('/', newOrder);

module.exports=router;