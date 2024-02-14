const categoryModel = require("../models/category.model");

// create a new category  parent 

exports.createCategory = async (req, res) => { 
  const nameCategory = req.body.nameCategory;
  try {
    const category = await categoryModel.create({ nameCategory }); //{}
    res.status(201).json({ category }); //{}
  } catch (err) {
    res.status(400).send(err);  
  }
};
///////
// get all category
exports.gellAllCategory = async (req, res) => {
  try {
    const getCategories = await categoryModel.find();
    res.status(200).json({ count: getCategories.length, data: getCategories });
  } catch (err) {
    res.status(400).send(err);
  }
};
//get products //belonging to a specific category//
exports.getProductsByCategory = async (req,res)=>{
 try {
  const id = req.params.id ;
  // get the product by id 
  const getSpecificProduct = await Product.find({category : id});
  return getSpecificProduct; 
 }catch(err) {
  res.status(400).send(err);
 }
}
