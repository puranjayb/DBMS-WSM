DROP PROCEDURE IF EXISTS getWarehouseDetails;
DROP PROCEDURE IF EXISTS getStockDetails;
DROP PROCEDURE IF EXISTS getProductDetils;
DROP PROCEDURE IF EXISTS addProduct;
DROP PROCEDURE IF EXISTS addStock;
DROP PROCEDURE IF EXISTS addWarehouse;

DELIMITER //
CREATE PROCEDURE getWarehouseDetails()
    BEGIN
        SELECT * FROM warehouse;
    END
//

CREATE PROCEDURE getStockDetails()
    BEGIN
        SELECT * FROM stock;
    END
//

CREATE PROCEDURE getProductDetils()
    BEGIN
        SELECT * FROM product;
    END
//

CREATE PROCEDURE addProduct(
    IN p_name VARCHAR(255), 
    IN p_description TEXT, 
    IN p_category VARCHAR(255), 
    IN p_manufacturer VARCHAR(255), 
    IN p_weight DECIMAL(10,2), 
    IN p_dimension VARCHAR(255), 
    IN p_price DECIMAL(10,2)
)
BEGIN
    INSERT INTO product(product_name, product_description, product_category, product_manufacturer, product_weight, product_dimension, product_price)
    VALUES (p_name, p_description, p_category, p_manufacturer, p_weight, p_dimension, p_price);
END 
//

CREATE PROCEDURE addStock(
    IN s_product_id INT,
    IN s_warehouse_id INT,
    IN s_name VARCHAR(255),
    IN s_quantity INT,
    IN s_expiration_data DATE
)
BEGIN
    INSERT INTO stock(stock_product_id, stock_warehouse_id, stock_name, stock_quantity, stock_expiration_date)
    VALUES (s_product_id, s_warehouse_id, s_name, s_quantity, s_expiration_data);
END
//

CREATE PROCEDURE addWarehouse(
    IN w_name VARCHAR(255),
    IN w_address TEXT,
    IN w_manager VARCHAR(255),
    IN w_capacity INT
)
BEGIN
    INSERT INTO warehouse(warehouse_name, warehouse_address, warehouse_manager, warehouse_maximum_capacity)
    VALUES (w_name, w_address, w_manager, w_capacity);
END//

DELIMITER ;