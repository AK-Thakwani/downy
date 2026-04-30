const db = require('../config/db');

class Order {
  static async getNextOrderId() {
    const [rows] = await db.query("SELECT MAX(Order_id) as maxId FROM customer_purchasing");
    return (rows[0].maxId || 99999) + 1;
  }

  static async createCustomerRecord(orderData) {
    const { order_id, full_name, mobile_no, email, city, postal_code, address } = orderData;
    const sql = "INSERT INTO customer_purchasing (Order_id, Full_name, Mobile_no, email, City, Postal_code, Address) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await db.query(sql, [order_id, full_name, mobile_no, email, city, postal_code, address]);
  }

  static async createOrderDetails(order_id, items) {
    const sql = "INSERT INTO order_details (Order_id, Pid, size, quantity, price) VALUES ?";
    const values = items.map(item => [order_id, item.Pid, item.size, item.quantity, item.price]);
    await db.query(sql, [values]);
  }

  static async createPayment(paymentData) {
    const { order_id, method, total_amount, dates } = paymentData;
    const sql = "INSERT INTO payment (Order_id, Method, Total_amount, Dates) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(sql, [order_id, method, total_amount, dates]);
    return result.insertId;
  }

  static async createPaymentMethod(methodData) {
    const { payid, card_name, card_no, cvv, exp_date } = methodData;
    const sql = "INSERT INTO payment_method (Payid, Card_name, Card_no, CVV, EXP_date) VALUES (?, ?, ?, ?, ?)";
    await db.query(sql, [payid, card_name, card_no, cvv, exp_date]);
  }

  static async getAllOrders() {
    const sql = "SELECT CP.*, P.Total_amount as total_amount, P.Method as method FROM customer_purchasing CP LEFT JOIN payment P ON CP.Order_id = P.Order_id ORDER BY CP.Order_id DESC";
    const [rows] = await db.query(sql);
    return rows;
  }

  static async getOrderById(order_id) {
    const sql = "SELECT * FROM customer_purchasing WHERE Order_id = ?";
    const [rows] = await db.query(sql, [order_id]);
    return rows[0];
  }

  static async getOrderDetails(orderId) {
    const sql = "SELECT P.Firstimg, P.Pname, D.size, D.quantity, (P.price * D.quantity) AS PQ FROM order_details D JOIN Product P ON D.Pid = P.Pid WHERE D.order_id = ?";
    const [rows] = await db.query(sql, [orderId]);
    return rows;
  }

  static async updateStatus(orderId, status) {
    const sql = "UPDATE customer_purchasing SET status = ? WHERE Order_id = ?";
    await db.query(sql, [status, orderId]);
  }

  static async getStats() {
    const [revenue] = await db.query("SELECT SUM(total_amount) as total FROM payment");
    const [orders] = await db.query("SELECT COUNT(*) as count FROM customer_purchasing");
    const [lowStock] = await db.query("SELECT COUNT(*) as count FROM product_sizes WHERE quantity < 10");
    
    return {
      totalRevenue: revenue[0].total || 0,
      orderCount: orders[0].count || 0,
      lowStockCount: lowStock[0].count || 0
    };
  }

  static async deleteOrder(orderId) {
    await db.query("DELETE FROM order_details WHERE Order_id = ?", [orderId]);
    await db.query("DELETE FROM payment_method WHERE Payid IN (SELECT Payid FROM payment WHERE Order_id = ?)", [orderId]);
    await db.query("DELETE FROM payment WHERE Order_id = ?", [orderId]);
    await db.query("DELETE FROM customer_purchasing WHERE Order_id = ?", [orderId]);
  }
}

module.exports = Order;
