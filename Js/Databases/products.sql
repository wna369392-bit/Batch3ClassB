CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER,
    stock_quantity INTEGER DEFAULT 0
);

INSERT INTO products (name, price, stock_quantity)
VALUES ('Wireless Mouse', 35000, 50);

INSERT INTO products (name, price, stock_quantity)
VALUES
('Mechanical Keyboard', 120000, 20),
('HDMI Cable', 8000, 100);

SELECT * FROM products;

SELECT name, price
FROM products;

UPDATE products
SET price = 38000
WHERE id = 1;

UPDATE products
SET stock_quantity = 35
WHERE id = 2;

SELECT * FROM products;

DELETE FROM products
WHERE id = 3;

SELECT * FROM products;

ALTER TABLE products
ADD CONSTRAINT check_price
CHECK (price >= 0);

INSERT INTO products (name, price, stock_quantity)
VALUES ('Test Product', -5000, 10);
