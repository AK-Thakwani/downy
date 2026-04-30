const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getHomePage);
router.get('/about', productController.getAboutPage);
router.get('/contact', productController.getContactPage);
router.get('/shop', productController.getCategoryPage);
router.get('/formals', productController.getCategoryPage);
router.get('/casuals', productController.getCategoryPage);
router.get('/sandals', productController.getCategoryPage);
router.post('/single', productController.getSingleProduct);

module.exports = router;
