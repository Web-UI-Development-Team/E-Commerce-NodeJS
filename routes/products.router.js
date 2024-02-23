const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin')

const controllers = require('../controllers/products.controller');
const getCategoryName = require('../helpers/search.helpers');

router.get("/", controllers.getAllProducts);

router.get("/:id", controllers.getProductById);

router.get("/search/:name/:value", controllers.searchProduct);

router.post("/", controllers.createProduct); 

router.post("/", admin, controllers.createProduct);

router.patch("/:id", admin, controllers.updateProduct);

router.delete("/:id", admin, controllers.deleteProduct);

router.get("/filter/products",controllers.filteredProducts);

router.get("/search/id", getCategoryName)

module.exports = router;