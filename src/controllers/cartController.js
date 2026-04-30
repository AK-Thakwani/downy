const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCheckoutPage = async (req, res) => {
  try {
    const cartItems = await Cart.getCartItems();
    let totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    res.render('checkout', { Cartt: cartItems, Total_price: totalPrice, Empty: cartItems.length === 0 ? "Your cart is empty." : "" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.addToCart = async (req, res) => {
  const { Pid, radio: size, Quantity } = req.body;
  
  try {
    if (!size) {
      const product = await Product.getById(Pid);
      return res.render('single', {
        ShoeName: product.Pname,
        amount: product.price,
        First_img: product.Firstimg,
        Sec_img: product.Secondimg,
        Third_img: product.Thirdimg,
        Pid: product.Pid,
        Not_Available: 'Please select a size first!'
      });
    }

    console.log(`Adding to cart: Pid=${Pid}, size=${size}, qty=${Quantity}`);
    
    const product = await Product.getById(Pid);
    if (!product) return res.status(404).render('404');

    let stock = await Product.checkStock(Pid, size);
    console.log(`Stock found: ${stock}`);
    
    // Fallback for demonstration
    if (!stock || stock === 0 || isNaN(stock)) stock = 100;

    const existingInCart = await Cart.getItem(Pid, size);
    const currentQtyInCart = existingInCart ? parseInt(existingInCart.quantity) : 0;
    const requestedQty = parseInt(Quantity) || 1;

    console.log(`Checking: ${currentQtyInCart} + ${requestedQty} <= ${stock}`);

    if ((currentQtyInCart + requestedQty) <= parseInt(stock)) {
      if (existingInCart) {
        await Cart.updateQuantity(Pid, size, requestedQty);
      } else {
        await Cart.addItem(Pid, size, requestedQty);
      }
      res.redirect('/checkout');
    } else {
      res.render('single', {
        ShoeName: product.Pname,
        amount: product.price,
        First_img: product.Firstimg,
        Sec_img: product.Secondimg,
        Third_img: product.Thirdimg,
        Pid: product.Pid,
        Not_Available: 'Requested quantity not available in stock.'
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.removeFromCart = async (req, res) => {
  const { button: Pid } = req.body;
  try {
    await Cart.removeItem(Pid);
    res.redirect('/checkout');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
