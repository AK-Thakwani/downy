const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload'); // Import Cloudinary/Multer middleware

router.get('/loginadmin', adminController.getLoginPage);
router.post('/loginadmin', adminController.login);

// Protected Admin Routes
router.get('/insertproduct', auth.isAdmin, adminController.getInsertProductPage);
router.post('/insertproduct', auth.isAdmin, upload.fields([
  { name: 'uploadimage1', maxCount: 1 },
  { name: 'uploadimage2', maxCount: 1 },
  { name: 'uploadimage3', maxCount: 1 }
]), adminController.insertProduct);
router.get('/stockupdate', auth.isAdmin, adminController.getStockUpdatePage);
router.post('/stockupdate', auth.isAdmin, adminController.updateStock);
router.get('/checkrecord', auth.isAdmin, adminController.getRecordsPage);
router.post('/checkrecord', auth.isAdmin, adminController.searchRecord);
router.post('/update-status', auth.isAdmin, adminController.updateOrderStatus);
router.post('/delete-order', auth.isAdmin, adminController.deleteOrder);
router.post('/prune-cancelled', auth.isAdmin, adminController.pruneCancelledOrders);
router.get('/checkstock', auth.isAdmin, adminController.getCheckStockPage);

module.exports = router;
