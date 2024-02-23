require('mongoose');
const jwt = require('jsonwebtoken');

const productSerivces = require('../services/products.service');
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
}

const addProduct = async (req, res) => {
    const { error, value } = validator.cartValidation(req.body);
    
    if (error) {
        return res.status(422).send({ message: error.message });
    }

    const {product, quantity} = req.body;
    
    try {
        const token = req.headers['jwt'];

        if (!token) return res.status(401).send({ message: "unauthorized user" });

        const payload = jwt.verify(token, 'myjwtsecret');

        const user = await userServices.getUserService(payload.email);

        if (!user) return res.status(401).send({ message: "unauthorized user" });

        const isProduct = await productSerivces.getProductByIdService(product);

        if (!isProduct) return res.status(404).json("product not found");

        await cartServices.createCartService({user: user._id, product, quantity});

        await userServices.updateUserCartService(user.email, user.cart)

        res.status(200).json(user.shoppingCart);
    }
    catch (e) {
        console.log(e);
        res.status(500).json("server error")
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const quantity = req.body;
    
    try {
        const token = req.headers["jwt"];

        if (!token) return res.status(401).send({ message: "unauthorized user" });

        const payload = jwt.verify(token, 'myjwtsecret');

        const user = await userServices.getUserService(payload.email);

        if (!user) {
            return res.status(404).json("User not found");
        }

        // Find the product in the shopping cart by its ID

        const isProduct = await productSerivces.getProductByIdService(productId);

        if (!isProduct) return res.status(404).json("product not found");

        await cartServices.updateCartProduct(user._id, productId, quantity);

        // Object.assign(productToUpdate, req.body);

        // await user.save();

        // const updatedPrd = await User.updateOne(
        //     { email: email },
        //     { shoppingCart: }
        // );
        // console.log(updatedPrd);
        // res.status(200).json(user.shoppingCart);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json("Server error");
    }
}
const deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const token = req.headers['jwt'];

        if (!token) return res.status(401).send({ message: "unauthorized user" });

        const payload = jwt.verify(token, 'myjwtsecret');

        const user = await userServices.getUserService(payload.email);

        if (!user) return res.status(401).json({ message: "Unauthorized user" });

        await cartServices.deleteCartService(user._id, productId);

        res.status(200).json({ message: "Product deleted from shopping cart successfully" });
    }
    catch (e) {
        console.error("Error deleting product:", e);
        res.status(500).json("Server error");
    }
}

const clearCart = async (req, res) => {
    try {
        const token = req.headers['jwt'];
        const payload = jwt.verify(token, 'myjwtsecret');
        const email = payload.email;

        const user = await userServices.getUserService (email)
        if (!user) return res.status(401).json({ message: "Unauthorized user" });


       await cartServices.deleteAllCartService(user._id);
        res.status(200).json({ message: "All Products deleted from shopping cart successfully" });
    }
    catch (e) {
        console.error("Error deleting product:", e);
        res.status(500).json("Server error");
    }
}
module.exports = {
    getCurrentUserCart,
    addProduct,
    updateProduct,
    deleteProduct,
    clearCart
}