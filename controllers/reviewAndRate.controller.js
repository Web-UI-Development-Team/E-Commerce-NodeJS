const jwt = require('jsonwebtoken');

const productSerivces = require('../services/products.service');
const userServices = require('../services/user.service');
const Review = require('../models/review.model');
const Rating = require('../models/rating.model');

exports.addreview = async(req,res)=>{
  const {title, comment} = req.body;
  const productId = req.params.id

  try {
   const token = req.headers["jwt"];
 
   if (!token) return res.status(401).send({ message: "unauthorized user" });
 
   const payload = jwt.verify(token, "myjwtsecret");
 
   const user = await userServices.getUserService(payload.email);

   const isReviewed = await Review.findOne({user: user._id, product: productId});
   if(isReviewed) {
    res.status(401).send({message: "this product already review"});
    return;
   }
    const review = await Review.create({title,comment, user: user._id, product: productId}); 

    const product = await productSerivces.getProductByIdService(productId); 

    if(!product) { 
      res.status(401).send({message: "this product not found"});
    } ;
    product.reviews.push(review._id);
  
    await productSerivces.updateProductService(productId,{reviews: product.reviews});  // id product 
      res.status(201).json({review}) ; 
    
    }catch(error){
      console.log(error);
    }
    }
// get reviews for specific product 
exports.gellReviews = async (req,res)=>{
  const productId = req.params.id

 try {
  const findProduct = await productSerivces.getProductByIdService(productId);
  const reviews = findProduct.reviews; 
  if(reviews) {
    return res.status(200).json({reviews}) ;
  }else {
    res.status(404).send({message : 'this product do not have any review'}); 
  }
 }catch(error) { 
  res.status(200).send(error); 
 } 
}
///////add rating 
exports.addrating = async (req,res)=>{ 

  const productId = req.params.id
 try{ 
  const token = req.headers["jwt"];
 
  if (!token) return res.status(401).send({ message: "unauthorized user" });

  const payload = jwt.verify(token, "myjwtsecret");

  const user = await userServices.getUserService(payload.email);
  //
  const rate = +req.body.rate;  

  const rating = await Rating.create({rate, user:user._id, product:productId});
 
  res.send({rating}) ;
  
 }catch(error) {
  res.status(400).send(error); 
 }
} 

