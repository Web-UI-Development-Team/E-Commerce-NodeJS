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
  res.status(201).json(review);
};

exports.getReviews = async (req, res) => {

  const productId = req.params.id

  try {
    const findProduct = await productSerivces.getProductByIdService(productId);
    const reviews = findProduct.reviews;

    if (reviews) {
      return res.status(200).json(await reviewServices.getProductReviews(productId));
    } else {
      res.status(404).send({ message: 'this product do not have any review' });
    }
  } catch (error) {
    res.status(200).send(error);
  }
};

exports.deleteReview = async (req, res) => {
  const productId = req.params.id;

  const user = req.auth;

  const review = await reviewServices.getReview({ user: user._id, product: productId });


  if (review) {
    const product = await productSerivces.getProductByIdService(productId);

    product.reviews.splice(product.reviews.indexOf(review._id), 1);

    await productSerivces.updateProductService(productId, { reviews: product.reviews });
    await reviewServices.deleteReview(review._id);

    res.status(200).send({ message: "this product already reviewed" });
    return;
  }

}

exports.isReviewed = async (req, res) => {
  const productId = req.params.id;

  const user = req.auth;

  const isReviewed = await reviewServices.getReview({ user: user._id, product: productId });

  if (isReviewed) {
    return res.status(200).send({ isReviewed: true, reviewId: isReviewed._id });
  } else {
    return res.status(200).send({ isReviewed: false, reviewId: "" });
  }
}

exports.updateReview = async (req, res) => {
  const productId = req.params.id;

  const user = req.auth;

  const review = await reviewServices.getReview({ user: user._id, product: productId });

  if (review) {

    await reviewServices.updateReview(review._id, req.body);

    return res.status(200).send({ message: "Review updated successfully" });
  } else {
    return res.status(404).send({ message: "This review not found" });
  }
}
