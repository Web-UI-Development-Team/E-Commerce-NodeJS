const express = require('express');
const router = express.Router();

const controllers = require('../controllers/cart.controller');

router.get("/", controllers.getCurrentUserCart);

router.post("/add", controllers.addToCart);

router.patch("/", controllers.updateCart);

router.delete("/:productId", controllers.deleteCart);

// router.delete("/", controllers.clearCart);

module.exports = router;