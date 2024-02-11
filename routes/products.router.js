const express = require('express');
const router = express.Router();

const controllers = require('../controllers/products.controller');

router.get("/", controllers.getAllProducts);

router.get("/:id", controllers.getProductById);

router.post("/", controllers.createProduct);

router.patch("/:id", controllers.updateProduct);

router.delete("/:id", controllers.deleteProduct);

module.exports = router;