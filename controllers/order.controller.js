const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const orderServices = require("../services/order.service");
const cartServices = require("../services/cart.service");
const userServices = require("../services/user.service");

const calcTotalPrice = (order) => {
    var totalPrice = 0;

    for(var i = 0; i < order.length; i++) {
        totalPrice += order[i].product.price * order[i].quantity;
    }

    return totalPrice;
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderServices.getAllOrdersService();
        res.json(orders);
    }
    catch (e) {
        res.status(500).json(e, { message: 'Internal server error' });
    }
}

const getSpecificOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await orderServices.getOrderByIdService(orderId);

        if (!order) return res.status(404).json("Order not found");

        res.json(order);
    }
    catch (e) {
        res.status(500).json(e, { message: 'Internal server error' });
    }
}

const newOrder = async (req, res) => {
    try {
        /* User Data */
        const token = req.headers["jwt"];
        const {shippingAddress, city, phone} = req.body;

        // console.log(shippingAddress, city, phone);

        if (!token) return res.status(401).send({ message: "unauthorized user" });

        const payload = jwt.verify(token, "myjwtsecret");

        const user = await userServices.getUserService(payload.email);

        if (!user) return res.status(401).send({ message: "unauthorized user" });
        
        /* Order Data */
        const orderItems = await cartServices.getCurrentUserCartService(user._id);
        
        if (orderItems.length == 0) return res.status(401).send({ message: "cart is empty" });

        const totalPrice = calcTotalPrice(orderItems);

        console.log(orderItems);
        
        const data = {
            orderItems,
            shippingAddress,
            city,
            phone,
            totalPrice,
            user: user._id,
        }

        const newOrder = await orderServices.createOrderService(data);

        await cartServices.deleteAllCartService(user._id);

        res.status(201).json(newOrder);
    }
    catch (e) {
        res.status(500).json(e, { message: 'Internal server error' });
    }
}

const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const updatedOrder = await orderServices.updateOrderService(orderId, "Canceled");

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order cancelled successfully', order: updatedOrder });
    }
    catch (e) {
        res.status(500).json(e);
    }
}

module.exports = {
    getAllOrders,
    getSpecificOrder,
    newOrder,
    cancelOrder
}