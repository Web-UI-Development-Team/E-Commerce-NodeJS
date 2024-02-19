const services = require("../services/order.service");
const mongoose = require('mongoose');


const getAllOrders=async(req,res)=>{
    try{
        const orders = await services.getAllOrdersService();
        res.json(orders);
    }
    catch(e){
        res.status(500).json(e,{ message: 'Internal server error' });
    }
}

const getSpecificOrder=async(req,res)=>{
    try{
        const orderId = req.params.id;
        const order = await services.getOrderByIdService(orderId);

        if(!order) return res.status(404).json("Order not found");

        res.json(order);
    }
    catch(e){
        res.status(500).json(e,{ message: 'Internal server error' });
    }
}

const newOrder=async (req,res)=>{
    try{
        /* Order Data */
        const newOrderData=req.body;

        /* User Data */
        const token = req.headers["jwt"];

        if (!token) return res.status(401).send({ message: "unauthorized user" });

        const payload = jwt.verify(token, "myjwtsecret");
        const { email } = payload;

        newOrderData.email = email;

        const newOrder = await services.createOrderService(newOrderData);
        res.status(201).json(newOrder);
    }
    catch(e){
        res.status(500).json(e,{ message: 'Internal server error' });
    }
}

const cancelOrder=async(req,res)=>{
    try{
        const orderId=req.params.id;
        console.log(orderId);
        const updatedOrder= await services.updateOrderService(orderId, "canceled");

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