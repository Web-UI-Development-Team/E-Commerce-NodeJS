const express = require('express');
const router = express.Router();

const controller = require('../controllers/cart.controller');

router.get("/", controller.getCurrentUser);

router.post("/", controller.addProduct);

router.patch("/:cartId", controller.updatePrd);

router.delete("/:productId", controller.deletePrd);

router.delete("/", controller.clearCart);

module.exports = router;