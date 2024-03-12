const express = require('express');
const router = express.Router();

const controllers = require('../controllers/cart.controller');

router.get("/", controllers.getCurrentUserCart);

router.post("/add", controllers.addProduct);

router.patch("/:productId", controllers.updateProduct);

router.delete("/:productId", controllers.deleteProduct);

router.delete("/", controllers.clearCart);

module.exports = router;