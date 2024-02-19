const Order = require("../models/order.model");
const mongoose=require('mongoose');


const getAllOrders=async(req,res)=>{
    try{
        const orders=await Order.find().populate('orderItems').populate('user');
        res.json(orders);
    }
    catch(e){
        res.status(500).json(e,{ message: 'Internal server error' });
    }
}

const getSpecificOrder=async(req,res)=>{
    try{
        const orderId=req.params.id;
        const order=await Order.findById(orderId).populate('orderItems').populate('user');
        if(!order)return res.status(404).json("Order not found");
        res.json(order);
    }
    catch(e){
        res.status(500).json(e,{ message: 'Internal server error' });
    }
}

const newOrder=async (req,res)=>{
    try{
        const newOrderData=req.body;
        const newOrder=await Order.create(newOrderData);
        res.status(201).json(newOrder);
    }
    catch(e){
        res.status(500).json(e,{ message: 'Internal server error' });
    }
}

const cancelOrder=async(req,res)=>{
    try{
        const orderId=req.params.id;
        const updatedOrder=Order.findByIdAndUpdate(orderId, { status: 'cancelled'},{new:true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order cancelled successfully', order: updatedOrder });
    }
    catch(e){
        res.status(500).json(e);
    }
}
module.exports={
    getAllOrders,
    getSpecificOrder,
    newOrder,
    cancelOrder
}