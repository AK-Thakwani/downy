const Cart = require('../models/Cart');

exports.getCartCount = async (req, res, next) => {
    try {
        const cartItems = await Cart.getCartItems();
        res.locals.cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        next();
    } catch (err) {
        console.error("Cart Middleware Error:", err);
        res.locals.cartCount = 0;
        next();
    }
};
