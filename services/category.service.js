const Category = require("../models/category.model");
const Product = require("../models/product.model");

const createNewCategoryService = async (categroy) => {
  try {
    return await Category.create(categroy);
  } catch (e) {
    console.log(e);
  }
};

const getAllCategoriesService = async () => {
  try {
    return await Category.find();
  } catch (e) {
    console.log(e);
  }
};

const getProductsByCategoryService = async (categoryId) => {
  try {
    return await Product.find({ category: categoryId }).populate();
  } catch (e) {
    console.log(e);
  }
};

const getFilteredCategoriesService = async (params) => {
  if (!params) {
    resizeBy.status(404).send("The Category not found");
    return;
  }
  const categories = await Category.find(params);
  return categories;
};

const getCategoryByName = async (name) => {
  try {
    return await Category.find({ nameCategory: name });
  } catch (e) {
    console.log(e);
  }
};

const getCategoryById = async (id) => {
  try {
    return await Category.findOne({ _id: id });
  } catch (e) {
    console.log(e);
  }
};

const updateCategoryDataService = async (id, body) => {
  try {
    return await Category.updateOne({ _id: id }, body);
  } catch (e) {
    console.log(e);
  }
};

// console.log(getFilteredCategoriesService);

module.exports = {
  createNewCategoryService,
  getAllCategoriesService,
  getProductsByCategoryService,
  getFilteredCategoriesService,
  getCategoryByName,
  getCategoryById,
  updateCategoryDataService,
};
