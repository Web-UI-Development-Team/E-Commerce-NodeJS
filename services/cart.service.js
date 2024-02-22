const Cart = require('../models/cart.model')


const getCurrentUserCartService = async id =>{
    try{
        return await Cart.find({user: id}).select({product: 1, quantity: 1, _id: 0}).populate("product");
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

const updateCartProduct = async (user, product, quantity) => {
    try{
        return await Cart.updateOne({user, product}, {quantity});
    }
    catch(e){
        console.log("error : ",e);
    } 
}

module.exports = {
    getCurrentUserCartService,
    createCartService,
    updateCartProduct
}