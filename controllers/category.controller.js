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

exports.getProductsByCategory = async (req,res)=>{
 try {
  const id = req.params.id;

  const getSpecificProduct = await services.getProductsByCategoryService(id);

  return res.status(200).send(getSpecificProduct);   
 }catch(err) {
  res.status(400).send(err);
 }
};

exports.filteredCategories = async(req,res)=>{
  try{

    let queryStr = JSON.stringify(req.query);
    
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`);

    const queryObj = JSON.parse(queryStr);
    
    const categories = await services.getFilteredCategoriesService(queryObj);

    res.status(200).json({
      status:'success',
      length:categories.length,
      data:{
        categories
      }
    })
  }
  catch(error){
    console.log(error)
  }
};