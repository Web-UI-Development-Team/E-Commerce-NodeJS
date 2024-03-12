const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const productSerivces = require('../services/product.service');
const userServices = require('../services/user.service');
const cartServices = require('../services/cart.service');

const validator = require('../validation/cart.validator');
const Cart = require('../models/cart.model');

const getCurrentUserCart = async (req, res) => {

    try {
        const token = req.headers["jwt"];

        if (!token) return res.status(401).send({ message: "unauthorized user" });

        const payload = jwt.verify(token, "myjwtsecret");

        const user = await userServices.getUserService(payload.email);

        if (!user) {
            return res.status(401).send({ message: "unauthorized user" });
        }

        const cart = await cartServices.getCurrentUserCartService(user._id);

        res.status(200).send(cart);
    }
    catch (e) {
        console.log(e);
        res.status(500).json("server error")
    }
};

const addToCart = async (req, res) => {
    const { error, value } = validator.cartValidation(req.body);

    if (error) {
        return res.status(422).send({ message: error.message });
    }

    const { product, quantity } = req.body;

    try {
        const user = req.auth;
       
        const isProduct = await productSerivces.getProductByIdService(product);

        if (!isProduct) return res.status(404).json("product not found");

        const carts = await cartServices.getCurrentUserCartService(user._id);

        for (let i = 0; i < (carts.length); i++) {
            if (carts[i].product._id == product) {
                const newQuantity = carts[i].quantity += +quantity;

                let isAvaliable = await checkStock(product, newQuantity);

                if(isAvaliable){
                    res.status(501).send({message: "quantity not avaliable in stock"});
                    return;
                }

                await cartServices.updateCartService(user._id, carts[i].product._id, newQuantity);
                res.status(200).send(value);
                return;
            }
        }

        let isAvaliable = await checkStock(product, quantity);

        if(isAvaliable){
            res.status(501).send({message: "quantity not avaliable in stock"});
            return;
        }

        await cartServices.createCartService({ user: user._id, product, quantity });

        res.status(200).send(value);
    }
    catch (e) {
        res.status(500).send({message: e.message});
    }
};

const updateCart = async (req, res) => {
    const carts = req.body.carts;
    const user = req.auth;

    try {

        for(let i = 0; i < carts.length; i++)
        {
            const isProduct = await productSerivces.getProductByIdService(carts[i].productId);

            if (!isProduct) return res.status(404).json("product not found");
    
            await cartServices.updateCartService(user._id, carts[i].productId, carts[i].quantity);
        }

        res.status(200).send({message: "cart updated successfuly"});
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json("Server error");
    }
};

const deleteCart = async (req, res) => {
    const productId = req.params.productId;

    try {
        const user = req.auth;

        await cartServices.deleteCartService(user._id, productId);

        res.status(200).json({ message: "product deleted from shopping cart successfully" });
    }
    catch (e) {
        console.error("Error deleting product:", e);
        res.status(500).json("Server error");
    }
};

const clearCart = async (req, res) => {
    try {
        const user = req.auth;

        await cartServices.deleteAllCartService(user._id);
        res.status(200).json({ message: "All Products deleted from shopping cart successfully" });
    }
    catch (e) {
        console.error("Error deleting product:", e);
        res.status(500).json("Server error");
    }
};

async function checkStock(prdouctId, quantity) {
    const product = await productSerivces.getProductByIdService(prdouctId);

    if(+product.stock >= +quantity) {
        return false;
    }

    return true;
};

module.exports = {
    getCurrentUserCart,
    addToCart,
    updateCart,
    deleteCart,
    clearCart
}