const jwt = require('jsonwebtoken');

const productSerivces = require('../services/product.service');
const userServices = require('../services/user.service');
const ratingServices = require('../services/rating.service');

exports.addrating = async (req, res) => {

  const productId = req.params.id;

  const token = req.headers["jwt"];

  if (!token) {
    res.status(401).send({ message: "unauthorized user" });
    return;
  }

  const payload = jwt.verify(token, "myjwtsecret");

  const user = await userServices.getUserService(payload.email);

  const isRated = await ratingServices.getUserRating({ user: user._id, product: productId });

  if (isRated) {
    res.status(401).send({ message: "this product already rated" });
    return;
  }

  const rate = +req.body.rate;

  const rating = await ratingServices.createNewRating({ rate, user: user._id, product: productId });

  await calcRating(productId);

  res.send({ rating });
}

async function calcRating(productId) {
  var sum = 0;
  let rates = await ratingServices.getAllRates(productId);

  for (var i = 0; i < rates.length; i++) {
    sum += rates[i].rate;
  }

  let avg = Math.ceil(sum / rates.length);

  productSerivces.updateProductRateService(productId, avg);
}