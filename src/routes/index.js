const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/', productRoutes);
router.use('/', cartRoutes);
router.use('/', adminRoutes);

module.exports = router;
