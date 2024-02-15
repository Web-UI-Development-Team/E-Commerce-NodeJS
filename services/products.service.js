const Product = require('../models/product.model');

const getAllProductsService = async () => {
    try {
        return await Product.find();
    } catch (e) {
        console.log(e); 
    } 
};
 
const getProductByIdService = async id => {
    try {
        return await Product.find({_id: id});
    } catch(e) {
        console.log(e);
    }
}

const createNewProductService = async product => {
    try {
        return await Product.create(product);
    } catch (e) {
        console.log(e);
    }
}

const updateProductService = async (id, body) => {
    try {
        return await Product.updateOne({_id: id}, body);
    } catch (e) {
        console.log(e);
    }
}

const deleteProductService = async id =>  {
    try {
        return await Product.deleteOne({_id: id});
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getAllProductsService,
    getProductByIdService,
    createNewProductService,
    updateProductService,
    deleteProductService
}