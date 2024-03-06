const { name } = require('ejs');
const Product = require('../models/product.model');

const getAllProductsService = async () => {
    try {
        return await Product.find().populate('category');
    } catch (e) {
        console.log(e);
    }
};

const getProductByIdService = async id => {
    try {
        return await Product.findOne({ _id: id }).populate('category').populate("reviews");

    } catch (e) {
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
        return await Product.updateOne({ _id: id }, body);
    } catch (e) {
        console.log(e);
    }
}

const updateProductRateService = async (id, rating) => {
    try {
        console.log(rating);
        return await Product.updateOne({ _id: id }, {rating});
    } catch (e) {
        console.log(e);
    }
}

const deleteProductService = async id => {
    try {
        return await Product.deleteOne({ _id: id });
    } catch (e) {
        console.log(e);
    }
}

// const searchProductService = async (key,value) =>{
//     let product;
//         if(!key){
//             resizeBy.status(404).send("The Product not found");
//             return;
//         }
//         if(key == 'title'){
//             product = await Product.find({title:value});
//         }
//         if(key == 'brand'){
//             product = await Product.find({brand:value});
//         }
//         return product;
// }

// exports.postSearch=async (req,res,next)=>{
//     const search= req.body.search;
//     if(!search){
//       return res.redirect('/')
//     }
//     const newSearch = await Product.find({ title: { "$regex": search, "$options": "i" } })
//     .then(data=>{
//       console.log("this is search" + data);
//     })
//     .catch(err=>{
//       console.log(err);
//     })
//     res.redirect('/')
//   }

const productSearchServices = async (search) => {
    try {
        return await Product.find({ title: { "$regex": search, "$options": "i" } })
    }
    catch (err) {
        console.log(err)
    }
}

const getFilteredProductsService = async (params) => {
    if (!params) {
        resizeBy.status(404).send("The Product not found");
        return;
    }
    const products = await Product.find(params);
    return products;
}

module.exports = {
    getAllProductsService,
    getProductByIdService,
    createNewProductService,
    updateProductService,
    deleteProductService,
    productSearchServices,
    getFilteredProductsService,
    updateProductRateService
}
