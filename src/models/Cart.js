const db = require('../config/db');

class Cart {
  static async getCartItems() {
    const sql = "SELECT C.size, C.Pid, P.Firstimg, P.Pname, P.price, C.quantity, (P.price * C.quantity) AS PQ FROM Cart AS C JOIN Product P ON C.Pid = P.Pid";
    const [rows] = await db.query(sql);
    return rows;
  }

  static async removeItem(pid) {
    const sql = "DELETE FROM Cart WHERE Pid = ?";
    await db.query(sql, [pid]);
  }

  static async getItem(pid, size) {
    const sql = "SELECT * FROM Cart WHERE Pid = ? AND size = ?";
    const [rows] = await db.query(sql, [pid, size]);
    return rows[0];
  }

  static async addItem(pid, size, quantity) {
    const sql = "INSERT INTO Cart (Pid, size, quantity) VALUES (?, ?, ?)";
    await db.query(sql, [pid, size, quantity]);
  }

  static async updateQuantity(pid, size, quantity) {
    const sql = "UPDATE Cart SET quantity = quantity + ? WHERE Pid = ? AND size = ?";
    await db.query(sql, [quantity, pid, size]);
  }

  static async clearCart() {
    const sql = "DELETE FROM Cart";
    await db.query(sql);
  }
}

module.exports = Cart;
