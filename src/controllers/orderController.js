const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');
const emailService = require('../utils/emailService');

exports.getPaymentPage = (req, res) => {
  res.render('payment');
};

exports.processCheckout = async (req, res) => {
  const { name, Mobile_no, email, City, Postal_Code, Address } = req.body;
  
  try {
    const cartItems = await Cart.getCartItems();
    if (cartItems.length === 0) {
      return res.render('checkout', { Empty: "Your Cart is Empty", Total_price: 0 });
    }

    if (Postal_Code.length === 5 && Mobile_no.length === 11) {
      req.session.tempOrder = { name, Mobile_no, email, City, Postal_Code, Address };
      res.render('payment');
    } else {
      let totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      res.render('checkout', { Cartt: cartItems, Total_price: totalPrice, Empty: "Wrong Input Details (Check Mobile/ZIP length)" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.processPayment = async (req, res) => {
  const { Payment: method, name: cardName, number: cardNo, security: cvv, expiration: expDate } = req.body;
  const customerInfo = req.session.tempOrder;

  if (!customerInfo) {
    console.error("Payment Error: No customer info in session (tempOrder missing)");
    return res.status(400).send("Session expired or invalid checkout state. Please go back to cart and try again.");
  }

  try {
    const cartItems = await Cart.getCartItems();
    if (cartItems.length === 0) {
      return res.render('payment', { Errorr: "Your Cart is Empty" });
    }

    if (method === "CARD") {
      if (cardNo.length !== 16) return res.render('payment', { Errorr: "Invalid Card Number" });
      if (cvv.length !== 3) return res.render('payment', { Errorr: "Invalid Card CVV" });
    }

    console.log(`Processing ${method} payment for ${customerInfo.name}...`);
    const orderId = await Order.getNextOrderId();
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const currentDate = new Date().toLocaleDateString('en-GB');

    // Create Order
    await Order.createCustomerRecord({
      order_id: orderId,
      full_name: customerInfo.name,
      mobile_no: customerInfo.Mobile_no,
      email: customerInfo.email,
      city: customerInfo.City,
      postal_code: customerInfo.Postal_Code,
      address: customerInfo.Address
    });

    await Order.createOrderDetails(orderId, cartItems);

    const payId = await Order.createPayment({
      order_id: orderId,
      method: method,
      total_amount: totalPrice,
      dates: currentDate
    });

    if (method === "CARD") {
      const hashedCardNo = await bcrypt.hash(cardNo, 10);
      const hashedCvv = await bcrypt.hash(cvv, 10);
      await Order.createPaymentMethod({
        payid: payId,
        card_name: cardName,
        card_no: hashedCardNo,
        cvv: hashedCvv,
        exp_date: expDate
      });
    }

    // Update Stock and Clear Cart
    for (const item of cartItems) {
      await Product.updateStock(item.Pid, item.size, -item.quantity);
    }
    await Cart.clearCart();

    // Create Order Details for email/view
    const orderDetails = cartItems.map(item => ({
      Pname: item.Pname,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
      PQ: item.price * item.quantity
    }));

    // Send Confirmation Email (wrapped in try/catch to prevent blocking the Thank You page)
    try {
      await emailService.sendOrderConfirmation(customerInfo.email, orderId, customerInfo.name, orderDetails);
    } catch (emailErr) {
      console.error("Email Confirmation Failed:", emailErr);
    }

    // Clean up temp order from session
    delete req.session.tempOrder;

    console.log(`Order ${orderId} placed successfully. Rendering ThankuPage.`);
    res.render('ThankuPage', { objectArray: orderDetails, orderId });

  } catch (err) {
    console.error("Payment Processing Error:", err);
    res.status(500).send('Something went wrong during payment. Please contact support. Error: ' + err.message);
  }
};


exports.getTrackPage = async (req, res) => {
  const { orderId } = req.query;
  if (orderId) {
    try {
      const order = await Order.getOrderById(orderId);
      if (order) {
        const details = await Order.getOrderDetails(orderId);
        return res.render('track', { order, details, prefillId: orderId });
      }
    } catch (err) {
      console.error(err);
    }
  }
  res.render('track');
};

exports.trackOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Order.getOrderById(orderId);
    if (!order) return res.render('track', { Error: "Order ID not found." });

    const details = await Order.getOrderDetails(orderId);
    res.render('track', { order, details });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
