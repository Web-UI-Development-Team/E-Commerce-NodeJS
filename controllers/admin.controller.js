const services = require('../services/admin.service');
const orderServices = require('../services/order.service');
const productServices = require('../services/product.service');
const categoryServices = require('../services/category.service')

const getAllUsers = async (req, res) => res.send(await services.getAllUsersService());

const getAllOrders = async (req, res) => res.send(await orderServices.getAllOrdersService());

const getAllProducts = async (req, res) => res.send(await productServices.getAllProductsService());

const getAllCategories = async (req, res) => res.send(await categoryServices.getAllCategoriesService());

const getUserAndProductLength = async (req, res) => {
    const users = await services.getAllUsersService();
    const products = await productServices.getAllProductsService();

    return res.send({usersLength: users.length, productsLength: products.length});
}

module.exports = {
    getAllUsers,
    getAllOrders,
    getAllProducts,
    getAllCategories,
    getUserAndProductLength
}