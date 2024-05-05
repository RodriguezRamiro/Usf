-- Comments in SQL Start with dash-dash --
-- add a product to the table with the name of "chair",
-- price of 44.00, and can_be_returned of false

INSERT INTO products
    (name, price, can_be_returned)
VALUES
    ('chair', '44.00', 'f');

-- add a product to the table with the name of "stool",
-- price of 25.99, and can_be_returned of true.

INSERT INTO products
    (name, price, can_be_returned)
VALUES
    ('stool'), 25.99, 't');

--add a product to the table with the name of "table", price of 124.00,
-- and can_be_returned of false.
INSERT INTO products
    (name, price, can_be_returned)
VALUES
    ('table', 124.00, 'f');

-- display all of the rows and columns in the table
SELECT * FROM products;

--Display all of the names and prices of the products.
SELECT name, price FROM products;

--add a new product - make up whatever you would like!

INSERT INTO products
    (name, price, can_be_returned)
VALUES
    ('Charging Dock' 150.00, 't');

-- Display only the products that 'can_be_returned'

SELECT * FROM products WHERE can_be_returned;

-- display only the products that have a priceless than 44.00
SELECT * FROM products WHERE price < 44.00;

--Display only the products that have a price in between 22.50 and 99.99
SELECT * FROM products WHERE price BEteeen 22.50 and 99.99;

-- theres a sale going on: everything is $20 off! update the database accordingly
UPDATE products SET price = price - 20;

-- because of the sale, everything that costs less than $25 has sold out.
-- remove all products whose price meets this criteria.

DELETE FROM products where price < 25;

--and now the sale is ove. for the remaining products,, increase their price by $20
UPDATE products SET price = price + 20;

-- theres been a change in company policy, and now all products are returnable
UPDATE products SET can_be_returned = 't';

