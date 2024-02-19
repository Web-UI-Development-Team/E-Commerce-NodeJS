const express = require('express');

const {createCategory, gellAllCategory,getProductsByCategory } = require('../controllers/category.controller'); 
const router = express.Router();  

router.route('/').get(gellAllCategory).post(createCategory) ;
router.route('/:id/products').get(getProductsByCategory);
module.exports = router; 
