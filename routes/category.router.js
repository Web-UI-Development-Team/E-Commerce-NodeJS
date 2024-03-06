const express = require('express');
const admin = require('../middleware/admin')

const {createCategory, gellAllCategories,getProductsByCategory, filteredCategories } = require('../controllers/category.controller'); 
const router = express.Router();  

router.route('/').get(gellAllCategories).post(createCategory, admin) ;
router.route('/:id/products').get(getProductsByCategory);
router.get("/filter/categories",filteredCategories)
module.exports = router; 
