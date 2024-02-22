const Category = require("../models/category.model");
const Product = require("../models/product.model");

const createNewCategoryService = async categroy => {
    try {
        return await Category.create(categroy);
    } catch (e) {
        console.log(e);
    }
}

const getAllCategoriesService = async () => {
    try {
        return await Category.find().select({ nameCategory: 1, _id: 0 });
    } catch (e) {
        console.log(e);
    }
}

const getProductsByCategoryService = async categoryId => {
    try {
        return await Product.find({category: categoryId}).populate();
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    createNewCategoryService,
    getAllCategoriesService,
    getProductsByCategoryService
}