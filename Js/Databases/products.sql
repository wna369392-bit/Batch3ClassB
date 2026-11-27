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

select * from products where name = 'Wireless Mouse';

select * from products where price > 20000;

select * from products where price >= 50000 and stock_quantity < 40;

select * from products where not name = 'HDMI Cable'

--postgresql special keywords like, between
select * from products where price between 10000 and 40000;
select * from products where name like '%Mechanical%';

--ordering
select * from products order by price asc;
select * from products order by price desc;
select * from products order by name asc;

--combine where clause and filtering
select * from products where stock_quantity > 0 order by price desc;

--limit rows
select * from products order by price desc limit 3;

--Aggregate Functions count(), sum(), min(), max(), avg()
select count(*) from products;
select sum(stock_quantity) from products;
select min(price) as cheapest_price, max(price) as priciest_price from products;


select name, avg(price) from products group by name;

