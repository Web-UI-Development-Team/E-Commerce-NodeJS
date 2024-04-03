const Order = require('../models/order.model');

const getAllOrdersService = async () => {
    try {
        return await Order.find().populate('orderItems').populate('user');
    } catch (e) {
        console.log(e);
    }
};

const getUserOrdersService = async (user) => {
    try {
        return await Order.find({user}).populate('orderItems').populate('user');
    } catch (e) {
        console.log(e);
    }
};

const getOrderByIdService = async (id) => {
    try {
        return await Order.findById(id).populate('orderItems').populate('user');
    } catch (e) {
        console.log(e);
    }
};

const createOrderService = async (data) => {
    try {
        return await Order.create(data);
    } catch (e) {
        console.log(e);
    }
};

const updateOrderService = async (id, status) => {
    try {
        return await Order.updateOne({ _id: id }, { status }); 
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getAllOrdersService,
    getUserOrdersService,
    getOrderByIdService,
    createOrderService,
    updateOrderService
}