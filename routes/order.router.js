const express = require('express');
const router = express.Router();

const controllers = require('../controllers/order.controller');
const admin = require('../middleware/admin.middleware');

router.get('/', controllers.getAllOrders);

router.get('/:id', controllers.getSpecificOrder); 

router.patch('/:id/cancel', controllers.cancelOrder);

router.post('/', controllers.createNewOrder);

module.exports = router; 

