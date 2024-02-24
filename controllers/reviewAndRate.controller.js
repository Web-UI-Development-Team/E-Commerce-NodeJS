const jwt = require('jsonwebtoken');

const productSerivces = require('../services/products.service');
const userServices = require('../services/user.service');
const Review = require('../models/review.model')

//add new review for a product 
////////if we add the all object and use put method 
// exports.addreview = async(req,res)=>{ 
//   const findProduct = await product.findById(req.params.id);//get product
//   //check the review is existed 
//   const reviewIsExisted = findProduct.reviews.find((review) => {
//     review.user === req.user._id //toString if happened error
//   }); 
//   if(reviewIsExisted) {
//     res.status(400).send({message : 'Product Alredy Reviewed'});
//   };
//   const review = { 
//     name : req.user.name ,  
//     comment : req.body,
//     user : req.user._id 
//   } ;// i do a object and will pass it to the array reviews 
//   product.reviews.push(review); 
//   await product.save();// 
//   res.status(201).send({message : 'review Added'}); 
// }
////////////////////////
/////// if we add just comment and use post method 
exports.addreview = async(req,res)=>{
  const {title, comment} = req.body;

  try {
   const token = req.headers["jwt"];
 
   if (!token) return res.status(401).send({ message: "unauthorized user" });
 
   const payload = jwt.verify(token, "myjwtsecret");
 
   const user = await userServices.getUserService(payload.email);
    const review = await Review.create({title,comment, user: user._id}); 

    const product = await productSerivces.getProductByIdService(req.params.id); 

    if(!product) { 
      res.status(401).send({message: "this product not found"})
    } ;
    product[0].reviews.push(review._id);
  
     await productSerivces.updateProductService(req.params.id,{reviews: product[0].reviews});  // id product 

    res.status(201).json({review}) ; 
 }catch(error){
  res.status(401).send(error); 
 }
}
// get reviews for specific product 
exports.gellReviews = async (req,res)=>{
 try {
  const findProduct = await Review.findById(req.params.id);
  const reviews = findProduct.reviews; 
  if(reviews) {
    return res.status.json({reviews}) 
  }else {
    res.status(404).send({message : 'this product do not have any review'}); 
  } 
 }catch(error) { 
  res.status(200).send(error); 
 } 
}
///////////////
///////add rating 
exports.addrating = async (req,res)=>{ 
 try{
  const findProduct = await product.findById(req.params.id);
  const rating = req.body.rating;  
  if(!rating) {
    const addrate = await product.updateOne({_id : findProduct , rating:rating} ) ///id
    res.status(201).send({addrate});  
  } 
  const averageRating = (rating + product.rating ) / 2 
  const addrate = await product.updateOne({_id : findProduct , rating:averageRating} ) ///id
  res.send({addrate}) 
 }catch(error) {
  res.status(400).send(error);
 }
} 

