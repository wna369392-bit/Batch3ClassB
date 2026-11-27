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

select * from orders where product_id = 1 or product_id = 2;

select * from orders where product_id in (1,2,5,8);


select * from orders order by order_date desc limit 1;

--Grouping Data with Group By
select product_id, sum(quantity_ordered) as total_units_sold from orders group by product_id;