const services = require('../services/admin.service');
const orderServices = require('../services/order.service');
const productServices = require('../services/product.service');
const categoryServices = require('../services/category.service')

const getAllUsers = async (req, res) => res.send(await services.getAllUsersService());

const getAllOrders = async (req, res) => res.send(await orderServices.getAllOrdersService());

const getAllProducts = async (req, res) => res.send(await productServices.getAllProductsService());

const getAllCategories = async (req, res) => res.send(await categoryServices.getAllCategoriesService());

module.exports = {
    getAllUsers,
    getAllOrders,
    getAllProducts,
    getAllCategories
}