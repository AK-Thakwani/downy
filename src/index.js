const express = require("express");
const path = require("path");
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes');

const session = require('express-session');
const helmet = require('helmet');
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for simplicity in this project (Handlebars/CDNs)
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'downy-secret-key-premium-99',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, // Set to true if using https
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// View engine setup
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    eq: (a, b) => a === b,
    getImageUrl: (url) => {
      if (!url) return '';
      if (url.startsWith('http')) return url;
      return `/${url}`;
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const Cart = require('./models/Cart');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Data Pruning: Clear Cart after every successful session (Safe Cleanup)
app.use(async (req, res, next) => {
  try {
    const items = await Cart.getCartItems();
    res.locals.cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    
    // Auto-Cleanup: If cart is empty, ensure table is truly empty (Maintenance)
    if (res.locals.cartCount === 0) {
      await Cart.clearCart();
    }
  } catch (err) {
    res.locals.cartCount = 0;
  }
  next();
});

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use(routes);

// 404 Handler
app.get('/*', (req, res) => {
  res.render("404");
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
