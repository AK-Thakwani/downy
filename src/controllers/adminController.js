const Product = require('../models/Product');
const Order = require('../models/Order');
const emailService = require('../utils/emailService');
const db = require('../config/db');

exports.getLoginPage = (req, res) => {
  res.render('loginadmin');
};

exports.login = async (req, res) => {
  const { UserName, password } = req.body;
  const envAdmin = process.env.ADMIN_USER || "admin";
  const envPass = process.env.ADMIN_PASS || "7258";

  if (UserName === envAdmin && password === envPass) {
    req.session.isAdmin = true;
    res.redirect('/checkrecord');
  } else {
    res.render('loginadmin', { ERROR: "Invalid Credentials" });
  }
};

exports.getInsertProductPage = (req, res) => {
  res.render('insertproduct');
};

exports.insertProduct = async (req, res) => {
  const { productid, productname, Category, price, Quantity40, Quantity41, Quantity42, Quantity43 } = req.body;
  
  try {
    const existing = await Product.getById(productid);
    if (existing) return res.render('insertproduct', { MSGGG: "Product Id already used" });

    // Extract Cloudinary URLs from req.files
    const final_imag1 = req.files && req.files.uploadimage1 ? req.files.uploadimage1[0].path : '';
    const final_imag2 = req.files && req.files.uploadimage2 ? req.files.uploadimage2[0].path : '';
    const final_imag3 = req.files && req.files.uploadimage3 ? req.files.uploadimage3[0].path : '';

    if (!final_imag1 || !final_imag2 || !final_imag3) {
      return res.render('insertproduct', { MSGGG: "Please upload all three images." });
    }

    await Product.insertProduct({ productid, productname, final_imag1, final_imag2, final_imag3, price });
    await Product.insertCategory(productid, Category);
    await Product.insertSizes(productid, [
      { size: '40', quantity: Quantity40 },
      { size: '41', quantity: Quantity41 },
      { size: '42', quantity: Quantity42 },
      { size: '43', quantity: Quantity43 }
    ]);

    res.render('insertproduct', { MSGGG: "Product Inserted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getStockUpdatePage = (req, res) => {
  res.render('stockupdate', { MSGGG: "", query: req.query });
};

exports.updateStock = async (req, res) => {
  const { productid, productsize, quantity } = req.body;
  try {
    await Product.updateStock(productid, productsize, parseInt(quantity));
    res.render('stockupdate', { MSGGG: "Stock Updated Successfully" });
  } catch (err) {
    res.render('stockupdate', { MSGGG: "Invalid Product Id" });
  }
};

exports.getRecordsPage = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    res.render('CheckRecord', { objectArray1: orders, MSGGG: "Enter Order Id to Search" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.searchRecord = async (req, res) => {
  const { OrderId } = req.body;
  try {
    const order = await Order.getOrderById(OrderId);
    if (!order) return res.render('CheckRecord', { MSGGG: "Invalid Order Id" });

    const details = await Order.getOrderDetails(OrderId);
    res.render('CheckRecord', { objectArray1: [order], objectArray: details, MSGGG: "Search Results" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { OrderId, status } = req.body;
  try {
    await Order.updateStatus(OrderId, status);
    
    if (status === 'Cancelled') {
      const order = await Order.getOrderById(OrderId);
      if (order && order.email) {
        try {
            await emailService.sendOrderCancellation(order.email, OrderId, order.Full_name);
        } catch (e) { console.error("Cancellation Email Failed", e); }
      }
    }
    
    res.redirect('/checkrecord');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.pruneCancelledOrders = async (req, res) => {
  try {
    const [cancelledOrders] = await db.query("SELECT Order_id FROM customer_purchasing WHERE status = 'Cancelled'");
    for (let order of cancelledOrders) {
      await Order.deleteOrder(order.Order_id);
    }
    const orders = await Order.getAllOrders();
    res.render('CheckRecord', { objectArray1: orders, MSGGG: "Database Cleaned: Cancelled Orders Pruned." });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteOrder = async (req, res) => {
  const { OrderId } = req.body;
  try {
    const order = await Order.getOrderById(OrderId);
    if (order && order.email) {
      try {
        await emailService.sendOrderCancellation(order.email, OrderId, order.Full_name, true);
      } catch (e) { console.error("Deletion Email Failed", e); }
    }
    
    await Order.deleteOrder(OrderId);
    const orders = await Order.getAllOrders();
    res.render('CheckRecord', { objectArray1: orders, MSGGG: "Order Deleted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getCheckStockPage = async (req, res) => {
  try {
    const products = await Product.getAll();
    const results = [];
    for (const p of products) {
      const sizes = await Product.getSizes(p.Pid);
      results.push({
        Firstimg: p.Firstimg,
        Pname: p.Pid,
        price: p.price,
        size40: sizes.find(s => s.size == '40')?.quantity || 0,
        size41: sizes.find(s => s.size == '41')?.quantity || 0,
        size42: sizes.find(s => s.size == '42')?.quantity || 0,
        size43: sizes.find(s => s.size == '43')?.quantity || 0,
      });
    }
    res.render('Checkstock', { objectArray: results, MSGGG: "Live Stock Overview" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
