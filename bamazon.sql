DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(40) NOT NULL,
department_name VARCHAR(40) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "Bath", 4.99, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Conditioner", "Bath", 5.99, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toothbrush", "Bath", 2.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cutting Board", "Kitchen", 18, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Maker", "Kitchen", 80, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Knife Set", "Kitchen", 25, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Duvet Cover", "Bed", 99.99, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Floor Rug", "Bed", 79.99, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sheets", "Bed", 19.99, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flashlight", "Hardware", 39.99, 6);
