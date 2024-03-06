const services = require('../services/product.service');    
const validation = require('../validation/product.validator');

const {getCategoryByName} = require('../services/category.service');

const getAllProducts = async (req, res) => res.send(await services.getAllProductsService());

const getProductById = async (req, res) => {
    const product = await services.getProductByIdService(req.params.id);

    if (product) res.send(product);
    else res.status(404).send("The product with id: " + req.params.id + " not exists");
}

const createProduct = async (req, res) => {
    const { error, value } = validation.craeteProductValidation(req.body);

    if (error) {
        return res.status(400).send({ message: error.message });
    }

    res.send(await services.createNewProductService(value));
}

const updateProduct = async (req, res) => {
    const product = await services.getProductByIdService(req.params.id);

    if (!product) {
        return res.status(404).send("The product with id: " + req.params.id + " not exists");
    }

    const { error, value } = validation.updateProductValidation(req.body);

    if (error) {
        return res.status(400).send({ message: "Please enter valid data" });
    }

    await services.updateProductService(req.params.id, req.body);

    res.send(await services.getProductByIdService(req.params.id));
}

const deleteProduct = async (req, res) => {
    const product = await services.getProductByIdService(req.params.id);

    if (!product) {
        res.status(404).send("The product with id: " + req.params.id + " not exists");
        return;
    }

    await services.deleteProductService(req.params.id);

    res.send(product);
}

const productSearch = async(req,res)=>{
    try{
        const product = await services.productSearchServices(req.params.search);

        if(!product || product.length ===0){
            res.status(404).send("The product doesn't exist");
            return;
        }

        res.status(201).send(product);
    }
    catch(err){
        console.log(err);
    }
}

const filteredProducts = async(req,res)=>{
    try{
        let queryStr =JSON.stringify(req.query);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`);

        const queryObj = JSON.parse(queryStr);

        const keys = Object.keys(queryObj);

        if(keys.includes("category")){
            const cat = await getCategoryByName(queryObj.category);
            queryObj.category = cat[0]._id;
        }

        const products = await services.getFilteredProductsService(queryObj);

        res.status(200).json({
            status:'success',
            length:products.length,
            data:{
                products
            }
        })
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    productSearch,
    filteredProducts
}