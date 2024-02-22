require('mongoose');
const jwt = require('jsonwebtoken');
const User=require('../models/user.model')
const Product=require('../models/product.model');
const { getProductByIdService } = require('../services/products.service');
const { getUserService } = require('../services/user.service');
const updateService = require('../services/cart.service');

const getCurrentUser = async (req, res) => {

    try {
        const token = req.headers["jwt"];
        if (!token) return res.status(401).send({ message: "unauthorized user" });
        const payload = jwt.verify(token, "myjwtsecret");
        const { email } = payload;

        // console.log(email)
        
       const user=await  getUserService(email);
        res.status(200).json(user.shoppingCart)
        if (!user) {
            return res.status(401).send({ message: "unauthorized user" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json("server error")
    }
}

const addProduct=async (req, res) => {
    const productId = req.body;
    try {
        const token = req.headers['jwt'];
        if (!token) return res.status(401).send({ message: "unauthorized user" });
        const payload = jwt.verify(token, 'myjwtsecret');
        const { email } = payload;
        const user = await getUserService(email);
        console.log(email);
        if (!user) return res.status(401).json({ message: "Unauthorized user" });

        const prd = await getProductByIdService(productId);
        console.log(prd);
        if (!prd) return res.status(404).json("product not found")
        user.shoppingCart.push(prd[0]);
        await updateService(user.email, user.shoppingCart);
        //  console.log(updatedUser);
        res.status(200).json(user.shoppingCart);
    }
    catch (e) {
        console.log(e);
        res.status(500).json("server error")
    }
};
const updatePrd=async (req, res) => {
    const cartId = req.params.cartId;
    try {
        // const email = req.headers["email"];
        const token = req.headers["jwt"];
        if (!token) return res.status(401).send({ message: "unauthorized user" });
        const payload = jwt.verify(token, 'myjwtsecret');
        const { email } = payload;

        const user = await getUserService(email)
        if (!user) {
            return res.status(404).json("User not found");
        }

        // Find the product in the shopping cart by its ID
        const productToUpdate = user.shoppingCart.find(product => product._id == cartId);

        if (!productToUpdate) {
            return res.status(404).json("Product not found in shopping cart");
        }

        Object.assign(productToUpdate, req.body);
        await user.save();

        // const updatedPrd = await User.updateOne(
        //     { email: email },
        //     { shoppingCart: }
        // );
        // console.log(updatedPrd);
        res.status(200).json(user.shoppingCart);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json("Server error");
    }
}
const deletePrd=async (req, res) => {
    const productId = req.params.productId;
    try {
        const token = req.headers['jwt'];
        if (!token) return res.status(401).send({ message: "unauthorized user" });
        const payload = jwt.verify(token, 'myjwtsecret');
        const { email } = payload;
        const user = await getUserService(email)
        if (!user) return res.status(401).json({ message: "Unauthorized user" });

        const productToDelete = user.shoppingCart.find(product => product._id == productId);
        if (!productToDelete) {
            return res.status(404).json("Product not found in shopping cart");
        }

        user.shoppingCart.splice(productToDelete,1);

        await user.save();
        res.status(200).json({ message: "Product deleted from shopping cart successfully" });
    }
    catch (e) {
        console.error("Error deleting product:", e);
        res.status(500).json("Server error");
    }
}

const clearCart=async(req,res)=>{
    try{
        const token=req.headers['jwt'];
        const payload=jwt.verify(token,'myjwtsecret');
        const email=payload.email;

        const user = await getUserService(email)
        if (!user) return res.status(401).json({ message: "Unauthorized user" });

        
        user.shoppingCart=[];
        await user.save();
        res.status(200).json({ message: "All Products deleted from shopping cart successfully" });
    }
    catch(e){
        console.error("Error deleting product:", e);
        res.status(500).json("Server error");
    }
}
module.exports={
    getCurrentUser,
    addProduct,
    updatePrd,
    deletePrd,
    clearCart
}