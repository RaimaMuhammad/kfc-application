CREATE DATABASE kfc_db;
USE kfc_db;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    type VARCHAR(50)
);

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products
(title, description, price, image, type)
VALUES
('Chicken Burger', 'Crispy chicken burger', 15000, 'burger.jpg', 'Burger'),
('Chicken Bucket', 'Delicious chicken bucket', 35000, 'bucket.jpg', 'Chicken'),
('French Fries', 'Crispy golden fries', 8000, 'fries.jpg', 'Sides'),
('Chicken Wings', 'Spicy chicken wings', 20000, 'wings.jpg', 'Chicken');
SELECT * FROM products;

SELECT id, firstname, email FROM users;
SELECT id, title FROM products;
