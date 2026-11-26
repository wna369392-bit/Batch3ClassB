CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    quantity_ordered INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO orders (product_id, quantity_ordered)
VALUES
(1, 2),
(2, 1),
(3, 5);

SELECT *
FROM orders
WHERE quantity_ordered > 3;

INSERT INTO orders (quantity_ordered)
VALUES (5);