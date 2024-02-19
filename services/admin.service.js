const Product = require('../models/product.model');
const User = require('../models/user.model');

const getAllUsersService = async () => {
    try {
        return await User.find();
    } catch (e) {
        console.log(e);
    }
};

const getAllProductsService = async () => {
    try {
        return await Product.find();
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getAllUsersService,
    getAllProductsService
}