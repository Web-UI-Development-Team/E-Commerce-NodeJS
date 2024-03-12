const Product = require('../models/product.model');
const User = require('../models/user.model');

const getAllUsersService = async () => {
    try {
        return await User.find();
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getAllUsersService,
}