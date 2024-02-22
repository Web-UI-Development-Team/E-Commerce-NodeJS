const express = require('express');
const router = express.Router();

const controller = require('../controllers/cart.controller');

router.get("/", controller.getCurrentUserCart);

router.post("/add", controller.addProduct);

router.patch("/:productId", controller.updateProduct);

router.delete("/:productId", controller.deleteProduct);

router.delete("/", controller.clearCart);

module.exports = router;