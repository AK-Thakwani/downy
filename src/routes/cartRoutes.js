const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');

// Cart Routes
router.get('/checkout', cartController.getCheckoutPage);
router.post('/add-to-cart', cartController.addToCart);
router.post('/checkout1', cartController.removeFromCart);

// Order/Payment Routes
router.post('/checkout', orderController.processCheckout);
router.post('/payment', orderController.processPayment);

// Tracking Routes
router.get('/track', orderController.getTrackPage);
router.post('/track', orderController.trackOrder);

module.exports = router;
