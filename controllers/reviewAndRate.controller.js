const product = require('../models/product.model'); 

//add new review for a product 
////////if we add the all object and use put method 
exports.addreview = async(req,res)=>{ 
  const findProduct = await product.findById(req.params.id);//get product
  //check the review is existed 
  const reviewIsExisted = findProduct.reviews.find((review) => {
    review.user === req.user._id //toString if happened error
  }); 
  if(reviewIsExisted) {
    res.status(400).send({message : 'Product Alredy Reviewed'});
  };
  const review = { 
    name : req.user.name ,  
    comment : req.body,
    user : req.user._id 
  } ;// i do a object and will pass it to the array reviews
  product.reviews.push(review); 
  await product.save();// 
  res.status(201).send({message : 'review Added'}); 
}
////////////////////////
/////// if we add just comment and use post method 
// exports.addreview = async(req,res)=>{
//   const comment = req.body;  
//  try {
//   const review = await product.create({comment});
//   res.status(201).json({review})
//  }catch(error){
//   res.status(200).send(error); 
//  }
// }
//get reviews for specific product 
exports.gellReviews = async (req,res)=>{
 try {
  const findProduct = await product.findById(req.params.id);
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

