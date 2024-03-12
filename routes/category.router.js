const express = require('express');
const router = express.Router();

const controllers = require('../controllers/category.controller');
const admin = require('../middleware/admin.middleware')

router.route('/').get(controllers.gellAllCategories).post(controllers.createCategory, admin);

router.route('/:id/products').get(controllers.getProductsByCategory);

router.get("/filter/categories", controllers.filteredCategories);

module.exports = router;