const db = require('../config/db');

class Product {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Product');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM Product WHERE Pid = ?', [id]);
    return rows[0];
  }

  static async getByCategory(category, sort = 'default') {
    let orderBy = 'Pid DESC';
    if (sort === 'price-low') orderBy = 'price ASC';
    else if (sort === 'price-high') orderBy = 'price DESC';
    else if (sort === 'az') orderBy = 'Pname ASC';
    else if (sort === 'za') orderBy = 'Pname DESC';
    else if (sort === 'selling') orderBy = 'Pid ASC';
    
    const sql = `SELECT * FROM Product WHERE Pid IN (SELECT Pid FROM Product_Category WHERE Category=?) ORDER BY ${orderBy}`;
    const [rows] = await db.query(sql, [category]);
    return rows;
  }

  static async checkStock(pid, size) {
    const [rows] = await db.query("SELECT quantity FROM product_sizes WHERE Pid = ? AND size = ?", [pid, size]);
    return rows.length > 0 ? rows[0].quantity : 0;
  }

  static async getSizes(pid) {
    const [rows] = await db.query('SELECT * FROM product_sizes WHERE Pid = ?', [pid]);
    return rows;
  }

  static async updateStock(pid, size, quantityChange) {
    const sql = "UPDATE product_sizes SET quantity = quantity + ? WHERE Pid = ? AND size = ?";
    await db.query(sql, [quantityChange, pid, size]);
  }

  static async insertProduct(data) {
    const { productid, productname, final_imag1, final_imag2, final_imag3, price } = data;
    const sql = "INSERT INTO Product (Pid, Pname, Firstimg, Secondimg, Thirdimg, price) VALUES (?)";
    const values = [productid, productname, final_imag1, final_imag2, final_imag3, price];
    await db.query(sql, [values]);
  }

  static async insertCategory(pid, category) {
    const sql = "INSERT INTO Product_Category (Pid, Category) VALUES (?, ?)";
    await db.query(sql, [pid, category]);
  }

  static async insertSizes(pid, sizes) {
    const sql = "INSERT INTO product_sizes (Pid, size, quantity) VALUES ?";
    const values = sizes.map(s => [pid, s.size, s.quantity]);
    await db.query(sql, [values]);
  }

  static async updateImages(pid, img1, img2, img3) {
    const sql = "UPDATE Product SET Firstimg = ?, Secondimg = ?, Thirdimg = ? WHERE Pid = ?";
    await db.query(sql, [img1, img2, img3, pid]);
  }
}

module.exports = Product;
