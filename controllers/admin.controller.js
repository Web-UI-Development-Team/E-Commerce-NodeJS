const services = require('../services/admin.service');
const orderServices = require('../services/order.service');
// const orderServices = require('../services/order.service');

const getAllUsers = async (req, res) => res.send(await services.getAllUsersService());

const getAllOrders = async (req, res) => res.send(await orderServices.getAllOrdersService());

const getAllProducts = async (req, res) => res.send(await services.getAllProductsService());

const getAllCategories = async (req, res) => res.send(await services.getAllCategoriesService());

module.exports = {
    getAllUsers,
    getAllOrders,
    getAllProducts,
    getAllCategories
}