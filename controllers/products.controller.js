const services = require('../services/products.service');
const productValidation = require('../validation/product.validator');

const getAllProducts = async (req, res) => res.send(await services.getAllProductsService());

const getProductById = async (req, res) => {
    const product = await services.getProductByIdService(req.params.id);

    if (product) res.send(product);
    else res.status(404).send("The product with id: " + req.params.id + " not exists");
}

const createProduct = async (req, res) => {
    const { error, value } = productValidation(req.body);

    if (error) {
        res.status(400).send({ message: "Error happened while creating a new product" });
        console.log(error);
        return;
    }

    res.send(await services.createNewProductService(value));
}

const updateProduct = async (req, res) => {
    const product = await services.getProductByIdService(req.params.id);

    if (!product) {
        res.status(404).send("The product with id: " + req.params.id + " not exists");
        return;
    }

    const { error, value } = productValidation(req.body);

    if (error) {
        res.status(400).send({ message: "Please enter valid data" });
        return;
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

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}