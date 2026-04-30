# Software Requirements Specification (SRS) - DownyShoes

## 1. Introduction
### 1.1 Purpose
This document provides a detailed overview of the DownyShoes E-commerce platform, including functional and non-functional requirements.

### 1.2 Scope
DownyShoes is a specialized e-commerce web application for footwear, featuring a customer-facing shop and a secure administrative dashboard.

## 2. System Overview
The system is built using the MEEN stack (MySQL, Express, EJS/Handlebars, Node.js). It is designed for cloud deployment using Aiven for Database-as-a-Service and Render for web hosting.

## 3. Functional Requirements

### 3.1 Customer Features
- **Product Catalog**: Browse sneakers, casuals, formals, and sandals.
- **Dynamic Cart**: Real-time cart management with animated quantity indicators.
- **Checkout Workflow**: Secure checkout process with card payment simulation.
- **Order Confirmation**: Automated email notifications sent via SMTP (Nodemailer) upon successful placement.
- **Thank You Feedback**: Visual confirmation page with success animations.

### 3.2 Administrative Features
- **Secure Authentication**: Protected login system using environment-based credentials.
- **Inventory Management**: Add new products, update stock levels, and track product availability.
- **Order Management**: Search, track, and update order statuses (Pending/Shipped/Delivered).
- **Data Pruning Tool**: One-click cleanup of cancelled orders to optimize database storage.
- **Automated Communication**: Trigger empathetic cancellation emails to customers if an order is deleted.

## 4. Non-Functional Requirements

### 4.1 Security
- **Middleware Protection**: All admin routes are guarded by custom authentication middleware.
- **Input Sanitization**: Use of parameterized SQL queries to prevent SQL Injection.
- **App Hardening**: Implementation of Helmet.js for secure HTTP headers.
- **Environment Protection**: Sensitive keys (DB URI, Email PASS) are stored in `.env` and excluded from version control.

### 4.2 Reliability
- **Fault Tolerance**: Redundant safety blocks in the checkout process ensure that email failures do not block order completion.
- **Scalability**: Database hosted on Aiven Cloud for 99.9% availability and scalability.

## 5. Technical Stack
- **Backend**: Node.js & Express.js
- **Frontend**: Handlebars (HBS), Vanilla CSS, Bootstrap.
- **Database**: MySQL (Aiven Cloud).
- **Security**: Helmet, Express-Session, Auth Middleware.
- **DevOps**: GitHub (Version Control), Render (Deployment).

---
**Version**: 2.0 (Production Ready)
**Author**: Sunny Andani / Antigravity AI
**Date**: May 2026
