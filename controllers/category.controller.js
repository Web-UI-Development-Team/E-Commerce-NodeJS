const categoryModel = require("../models/category.model");
const services = require("../services/category.service");
const validator = require("../validation/category.validator");

exports.createCategory = async (req, res) => {
  const { error, value } = validator.categoryValidation(req.body);

  if (error) {
    return res.status(422).send({ message: error.message });
  }

  await services.createNewCategoryService(value);

  res.status(200).send(value);
};

exports.gellAllCategories = async (req, res) => {
  try {
    const getCategories = await services.getAllCategoriesService();

    res.status(200).send({ count: getCategories.length, data: getCategories });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await services.getCategoryById(req.params.id);
    if (!category) {
      res.status(401).send({ message: "there is no category to show" });
      return;
    }
    res.status(200).send(category);
  } catch (e) {
    console.log(e);
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const getSpecificProduct = await services.getProductsByCategoryService(id);

    return res.status(200).send(getSpecificProduct);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.filteredCategories = async (req, res) => {
  try {
    let queryStr = JSON.stringify(req.query);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const queryObj = JSON.parse(queryStr);

    const categories = await services.getFilteredCategoriesService(queryObj);

    res.status(200).json({
      status: "success",
      length: categories.length,
      data: {
        categories,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateCategory = async (req, res) => {
  const category = await services.getCategoryById(req.params.id);
  if (!category) {
    return res
      .status(404)
      .send("The Category with id:" + req.params.id + "not exists");
  }

  const { error, value } = validator.updateCategoryValidator(req.body);

  if (error) {
    return res.status(400).send({ message: "Please enter valid data" });
  }

  console.log(req.body);

  await services.updateCategoryDataService(req.params.id, req.body);
  res.send(await services.getCategoryById(req.params.id));
};
