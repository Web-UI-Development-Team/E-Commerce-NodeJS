const jwt = require('jsonwebtoken');
const Review = require("../models/review.model")

const productSerivces = require('../services/product.service');
const userServices = require('../services/user.service');
const reviewServices = require('../services/review.service');
const User = require('../models/user.model');
  exports.addreview = async (req, res) => {
  const { title, comment } = req.body;
  const productId = req.params.id;

  const user = req.auth;

  const isReviewed = await reviewServices.getReview({ user: user._id, product: productId });

  if (isReviewed) {
    res.status(401).send({ message: "this product already reviewed" });
    return;
  }

  const review = await reviewServices.createNewReview({ title, comment, user: user._id, product: productId });

  const product = await productSerivces.getProductByIdService(productId);

  if (!product) {
    res.status(401).send({ message: "this product not found" });
    return;
  };

  product.reviews.push(review._id);

  await productSerivces.updateProductService(productId, { reviews: product.reviews });
  res.status(201).json({ review });
};

exports.gellReviews = async (req, res) => {
  const productId = req.params.id

  try {
    const findProduct = await productSerivces.getProductByIdService(productId);
    const reviews = findProduct.reviews;
    if (reviews) {
      return res.status(200).json({ reviews });
    } else {
      res.status(404).send({ message: 'this product do not have any review' });
    }
  } catch (error) {
    res.status(200).send(error);
  }
};




exports.deletereview = async (req, res) => {
  const id = req.params.id;
  try {
    const user = req.auth;

    console.log(id);
    const deletedReviewId = await Review.findById(id); 
    if (!deletedReviewId) {
      return res.status(404).send({message: 'this review not found '})
    }
    if(deletedReviewId.user.auth !== user._id)
    return res.status(403).json({message: 'Unauthorized '});
    await Review.findByIdAndDelete(id);
    return res.status(200).send({message: 'deleted successfully'})

  } catch (error) {
    console.error("Error deleting review:", error.message);
    throw error;
  }
};