
DROP DATABASE IF EXISTS Bamazon_db;
CREATE DATABASE Bamazon_db;
USE Bamazon_db;

CREATE TABLE products (

  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR (255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cellphone", "tech", 2.50, 100), ("Laptop", "tech", 3.10, 120), ("Headphones", "tech", 3.25, 75), 
("Charger", "tech", 2.50, 100), ("Laptop Mouse", "tech", 3.10, 120), ("USB", "tech", 3.25, 75),
("Screen Protector", "tech", 2.50, 100), ("Note Pad", "tech", 3.10, 120), ("Pen", "tech", 3.25, 75),
("Pencil", "tech", 3.25, 75);








