const Product = require('../models/Product');

const CATEGORY_MAP = {
  shop: 'Sneakers',
  formals: 'Formals',
  casuals: 'Casuals',
  sandals: 'Sandals',
};

exports.getHomePage = (req, res) => {
  res.render('index');
};

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getContactPage = (req, res) => {
  res.render('contact');
};

exports.getCategoryPage = async (req, res) => {
  const categoryKey = req.path.replace('/', '') || 'shop';
  const categoryName = CATEGORY_MAP[categoryKey] || CATEGORY_MAP.shop;
  
  try {
    const products = await Product.getByCategory(categoryName, req.query.sort);
    res.render(categoryKey, { 
      products, 
      categoryName,
      activeSort: req.query.sort || 'default'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getSingleProduct = async (req, res) => {
  const { id, shoe_item, amount } = req.body;
  try {
    const product = await Product.getById(id);
    if (!product) return res.status(404).render('404');

    res.render('single', {
      ShoeName: shoe_item || product.Pname,
      amount: amount || product.price,
      First_img: product.Firstimg,
      Sec_img: product.Secondimg,
      Third_img: product.Thirdimg,
      Pid: product.Pid,
      Not_Available: ""
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
