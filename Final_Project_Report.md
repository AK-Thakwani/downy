# Final Project Report: DownyShoes E-commerce Platform

## 1. Executive Summary
DownyShoes is a comprehensive E-commerce web application designed specifically for the footwear industry. It provides a seamless shopping experience for customers and a robust management system for administrators. The project leverages the MEEN stack (MySQL, Express.js, Handlebars, and Node.js) to deliver a high-performance, scalable, and secure platform.

## 2. Project Objectives
*   To develop a user-friendly interface for browsing and purchasing footwear.
*   To implement a secure administrative dashboard for inventory and order management.
*   To ensure data integrity and security using modern web standards.
*   To provide real-time updates on stock levels and order statuses.
*   To automate customer communication through email notifications.

## 3. Technology Stack
*   **Frontend**: Handlebars (HBS) for dynamic templating, Vanilla CSS for custom styling, and Bootstrap for responsive layouts.
*   **Backend**: Node.js and Express.js for server-side logic and API management.
*   **Database**: MySQL hosted on Aiven Cloud, utilizing parameterized queries for security.
*   **Authentication**: Express-session for session management and custom middleware for route protection.
*   **Security**: Helmet.js for HTTP header security and environment-based configuration for sensitive data.
*   **Communication**: Nodemailer for automated transactional emails.

## 4. System Architecture
The application follows the **Model-View-Controller (MVC)** architectural pattern:
*   **Models**: Manage data logic and database interactions (MySQL).
*   **Views**: Handle the presentation layer using Handlebars templates.
*   **Controllers**: Process user requests, interact with models, and render the appropriate views.

### 4.1 Database Design (ER Highlights)
The database consists of 9 core tables:
1.  **Product**: Stores primary shoe details (Name, Price, Images, Description).
2.  **Product_Category**: Maps products to specific categories (Sneakers, Casuals, etc.).
3.  **Product_sizes**: Manages inventory levels for different shoe sizes.
4.  **Cart**: Temporary storage for user selections.
5.  **Customer_Purchasing**: Stores customer details and shipping info for orders.
6.  **Order_Details**: Links orders to specific products and quantities.
7.  **Payment & Payment_Method**: Tracks financial transactions and simulated payment data.
8.  **Admin**: Stores encrypted credentials for administrative access.

## 5. Key Features
### 5.1 Customer Interface
*   **Dynamic Product Catalog**: Filterable products by category with high-quality image previews.
*   **Interactive Shopping Cart**: AJAX-based quantity updates and real-time total calculation.
*   **Seamless Checkout**: A multi-step checkout process with integrated payment simulation.
*   **Order Tracking**: Customers can track their order status using a unique Order ID.

### 5.2 Administrative Dashboard
*   **Inventory Control**: Real-time stock updates, low-stock alerts, and new product insertion.
*   **Order Management**: Detailed view of all customer orders with the ability to update statuses (Pending, Shipped, Delivered).
*   **Data Maintenance**: Tools for pruning old or cancelled orders to maintain database performance.
*   **Security Logs**: Protected access to administrative routes.

## 6. Implementation Highlights
### 6.1 Secure Authentication
Admin routes are protected using a dedicated middleware:
```javascript
// Example Middleware Logic
const isAdmin = (req, res, next) => {
    if (req.session.adminId) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};
```

### 6.2 Database Safety
All queries use the `mysql2` promise wrapper with placeholders to prevent SQL injection:
```sql
SELECT * FROM Product WHERE Pid = ?;
```

## 7. System Usage and Configuration
### 7.1 Environment Setup
The system requires a `.env` file with the following variables:
*   `PORT`: Server port (default 8000).
*   `ADMIN_USER`: Username for administrative login (default: `admin`).
*   `ADMIN_PASS`: Password for administrative login (default: `7258`).
*   `SESSION_SECRET`: Unique key for session encryption.
*   `EMAIL_USER` & `EMAIL_PASS`: SMTP credentials for automated notifications.

### 7.2 Administrative Access
To access the management tools:
1.  Navigate to `/loginadmin`.
2.  Enter the configured credentials.
3.  Upon successful login, you will be redirected to the **Order Records** dashboard.

## 8. Quality Assurance and Testing
*   **Functional Testing**: Verified all user flows from product selection to checkout completion.
*   **Security Testing**: Validated that unauthorized users cannot access administrative endpoints.
*   **Responsive Design**: Tested across mobile, tablet, and desktop viewports using Chrome DevTools.
*   **Edge Case Handling**: Implemented 404 handlers and database connection retries.

## 9. Conclusion
DownyShoes successfully demonstrates the integration of a full-stack web application with a cloud-hosted database. The platform is production-ready, featuring modern security practices, an intuitive UI, and efficient administrative tools.

## 10. Future Work
*   Integration of a real-time payment gateway (Stripe/PayPal).
*   Implementation of user accounts and purchase history.
*   AI-driven product recommendations based on browsing history.
*   Multi-currency and multi-language support.

---
**Project Author**: Sunny Andani
**Date**: May 2, 2026
