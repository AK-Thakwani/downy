-- Create Product table
CREATE TABLE IF NOT EXISTS Product (
  Pid INT PRIMARY KEY AUTO_INCREMENT,
  Pname VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  Firstimg VARCHAR(255),
  Secondimg VARCHAR(255),
  Thirdimg VARCHAR(255),
  description TEXT
);

-- Create Product_Category table
CREATE TABLE IF NOT EXISTS Product_Category (
  Pid INT NOT NULL,
  Category VARCHAR(50) NOT NULL,
  PRIMARY KEY (Pid, Category),
  FOREIGN KEY (Pid) REFERENCES Product(Pid)
);

-- Create Product_sizes table
CREATE TABLE IF NOT EXISTS Product_sizes (
  Pid INT NOT NULL,
  size VARCHAR(10) NOT NULL,
  quantity INT DEFAULT 0,
  PRIMARY KEY (Pid, size),
  FOREIGN KEY (Pid) REFERENCES Product(Pid)
);

-- Create Cart table
CREATE TABLE IF NOT EXISTS Cart (
  Pid INT NOT NULL,
  size VARCHAR(10) NOT NULL,
  quantity INT DEFAULT 1,
  PRIMARY KEY (Pid, size),
  FOREIGN KEY (Pid) REFERENCES Product(Pid)
);

-- Create Customer_Purchasing table
CREATE TABLE IF NOT EXISTS Customer_Purchasing (
  Order_id INT PRIMARY KEY,
  Full_name VARCHAR(100),
  Mobile_no VARCHAR(20),
  City VARCHAR(100),
  Postal_code VARCHAR(10),
  Address VARCHAR(255)
);

-- Create Order_Details table
CREATE TABLE IF NOT EXISTS Order_Details (
  Order_id INT NOT NULL,
  Pid INT NOT NULL,
  size VARCHAR(10),
  quantity INT DEFAULT 1,
  price DECIMAL(10, 2),
  PRIMARY KEY (Order_id, Pid),
  FOREIGN KEY (Order_id) REFERENCES Customer_Purchasing(Order_id),
  FOREIGN KEY (Pid) REFERENCES Product(Pid)
);

-- Create Payment table
CREATE TABLE IF NOT EXISTS Payment (
  Payid INT PRIMARY KEY AUTO_INCREMENT,
  Order_id INT NOT NULL,
  Method VARCHAR(50),
  Total_amount DECIMAL(10, 2),
  Dates VARCHAR(20),
  FOREIGN KEY (Order_id) REFERENCES Customer_Purchasing(Order_id)
);

-- Create Payment_Method table
CREATE TABLE IF NOT EXISTS Payment_Method (
  Payid INT PRIMARY KEY,
  Card_name VARCHAR(100),
  Card_no VARCHAR(255),
  CVV VARCHAR(255),
  EXP_date VARCHAR(10),
  FOREIGN KEY (Payid) REFERENCES Payment(Payid)
);

-- Create Admin table for login
CREATE TABLE IF NOT EXISTS Admin (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

-- Insert sample products
INSERT INTO Product (Pname, price, Firstimg, Secondimg, Thirdimg, description) VALUES
('Sneaker 1', 50.00, 'sneaker1.jpg', 'sneaker1_2.jpg', 'sneaker1_3.jpg', 'Comfortable sneaker'),
('Casual 1', 45.00, 'casual1.jpg', 'casual1_2.jpg', 'casual1_3.jpg', 'Casual shoe'),
('Formal 1', 80.00, 'formal1.jpg', 'formal1_2.jpg', 'formal1_3.jpg', 'Formal shoe'),
('Sandal 1', 35.00, 'sandal1.jpg', 'sandal1_2.jpg', 'sandal1_3.jpg', 'Comfortable sandal');

-- Insert product categories
INSERT INTO Product_Category VALUES
(1, 'Sneakers'),
(2, 'Casuals'),
(3, 'Formals'),
(4, 'Sandals');

-- Insert product sizes
INSERT INTO Product_sizes VALUES
(1, '6', 10),
(1, '7', 15),
(1, '8', 12),
(2, '6', 8),
(2, '7', 10),
(2, '8', 9),
(3, '7', 5),
(3, '8', 6),
(3, '9', 4),
(4, '6', 20),
(4, '7', 18),
(4, '8', 16);
