const Cart = require('../models/cart.model');

const getCurrentUserCartService = async id =>{
    try{
        return await Cart.find({user: id}).select({product: 1, quantity: 1, isInWishList: 1, _id: 0}).populate("product");
    }
    catch(e){
        console.log("error : ",e);
    }
}

const getCartByProductIdService = async (id, productId) =>{
    try{
        return await Cart.find({user: id, product: productId}).select({product: 1, quantity: 1, isInWishList: 1, _id: 0}).populate("product");
    }
    catch(e){
        console.log("error : ",e);
    }
}

const createCartService = async (body) => {
    try{
        return await Cart.create(body)
    }
    catch(e){
        console.log("error : ",e);
    }
}

const updateCartService = async (user, product, body) => {
    try{
        return await Cart.updateOne({user, product}, body);
    }
    catch(e){
        console.log("error : ",e);
    } 
}

const deleteCartService = async (user, product) => {
    try{
        return await Cart.deleteOne({user, product});
    }
    catch(e){
        console.log("error : ",e);
    } 
}

const deleteAllCartService = async (user) => {
    try{
        return await Cart.deleteMany({user});
    }
    catch(e){
        console.log("error : ",e);
    } 
}

module.exports = {
    getCurrentUserCartService,
    getCartByProductIdService,
    createCartService,
    updateCartService,
    deleteCartService,
    deleteAllCartService
}