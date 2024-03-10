-- TEST INSERT

INSERT INTO warehouse (warehouse_name, warehouse_address, warehouse_manager, warehouse_maximum_capacity)
VALUES ('The Sharma Store', 'abc, Jaipur, Rajasthan', 'Mr. Sharma', 1000);

INSERT INTO product (product_name, product_description, product_category, product_manufacturer, product_weight, product_dimension, product_price)
VALUES ('Rice', 'Basmati Rice', 'Grocery', 'Exo Mills', 5, '20x15x3 inch', 100);

INSERT INTO product (product_name, product_description, product_category, product_manufacturer, product_weight, product_dimension, product_price)
VALUES ('Wheat', 'Ashirvaad Aata', 'Grocery', 'Exo Mills', 4, '20x12x3 inch', 130);

INSERT INTO stock (stock_product_id, stock_warehouse_id, stock_name, stock_quantity, stock_expiration_date)
VALUES (1, 1, 'Basmati Rice', 100, '2024-12-24');

INSERT INTO stock (stock_product_id, stock_warehouse_id, stock_name, stock_quantity, stock_expiration_date)
VALUES (2, 1, 'Ashirvaad Aata', 100, '2024-12-24');
