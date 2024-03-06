const jwt = require('jsonwebtoken');

const productSerivces = require('../services/product.service');
const userServices = require('../services/user.service');
const reviewServices = require('../services/review.service')

exports.addreview = async (req, res) => {
  const { title, comment } = req.body;
  const productId = req.params.id;

  const token = req.headers["jwt"];

  if (!token) {
    res.status(401).send({ message: "unauthorized user" });
    return;
  }

  const payload = jwt.verify(token, "myjwtsecret");

  const user = await userServices.getUserService(payload.email);

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
}

// get reviews for specific product 
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
}