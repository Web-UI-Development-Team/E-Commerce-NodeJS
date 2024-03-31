const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const orderServices = require("../services/order.service");
const cartServices = require("../services/cart.service");
const userServices = require("../services/user.service");
const { compareSync } = require('bcrypt');

const calcTotalPrice = (orderItems) => {
    var totalPrice = 0;

    for (var i = 0; i < orderItems.length; i++) {
        totalPrice += orderItems[i].price * orderItems[i].quantity;
    }

    return totalPrice;
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderServices.getAllOrdersService();
        res.json(orders);
    }
    catch (e) {
        res.status(500).json(e, { message: 'Internal server error' });
    }
};

const getUserOrders = async (req, res) => {
    const user = req.auth;

    try {
        const orders = await orderServices.getUserOrdersService(user._id);
        res.json(orders);
    }
    catch (e) {
        res.status(500).json(e, { message: 'Internal server error' });
    }
};

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
};

const createNewOrder = async (req, res) => {
    const { shippingAddress, city, phone } = req.body;

    try {
        const user = req.auth;

        var orderItems = await cartServices.getCurrentUserCartService(user._id);

        orderItems = orderItems.map((item) => {
            return {
                title: item.product.title,
                price: item.product.price,
                thumbnail: item.product.thumbnail,
                quantity: item.quantity
            };
        })

        console.log(orderItems)

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
        res.status(500).send({ message: e.message });
    }
};

const changeOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body

        const updatedOrder = await orderServices.updateOrderService(orderId, status);

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: "order status change successfully to " + status, order: updatedOrder });
    }
    catch (e) {
        res.status(500).json(e);
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
};

module.exports = {
    getAllOrders,
    getUserOrders,
    getSpecificOrder,
    createNewOrder,
    changeOrderStatus,
    cancelOrder
}