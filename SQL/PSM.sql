-- Active: 1712908192328@@127.0.0.1@3306@wsm
DROP PROCEDURE IF EXISTS getWarehouseDetails;
DROP PROCEDURE IF EXISTS getStockDetails;
DROP PROCEDURE IF EXISTS getProductDetils;
DROP PROCEDURE IF EXISTS addProduct;
DROP PROCEDURE IF EXISTS addStock;
DROP PROCEDURE IF EXISTS addWarehouse;
DROP PROCEDURE IF EXISTS updateWarehouseByID;
DROP PROCEDURE IF EXISTS updateProductByID;
DROP PROCEDURE IF EXISTS updateStockByID;
DROP PROCEDURE IF EXISTS removeWarehouseByID;
DROP PROCEDURE IF EXISTS removeProductByID;
DROP PROCEDURE IF EXISTS removeStockByID;


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
END
//

CREATE PROCEDURE updateWarehouseByID(
    IN w_id INT,
    IN w_name VARCHAR(255),
    IN w_address TEXT,
    IN w_manager VARCHAR(255),
    IN w_capacity INT
)
BEGIN
    DECLARE current_capacity INT;
    SELECT warehouse_current_capacity INTO current_capacity FROM warehouse WHERE warehouse_id = w_id;

    IF w_capacity < current_capacity THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot update capacity. Overflow detected.';
    ELSE
        UPDATE warehouse
        SET warehouse_name = w_name, warehouse_address = w_address, warehouse_manager = w_manager, warehouse_maximum_capacity = w_capacity
        WHERE warehouse_id = w_id;
    END IF;
END
//

CREATE PROCEDURE updateProductByID(
    IN p_id INT,
    IN p_name VARCHAR(255), 
    IN p_description TEXT, 
    IN p_category VARCHAR(255), 
    IN p_manufacturer VARCHAR(255), 
    IN p_weight DECIMAL(10,2), 
    IN p_dimension VARCHAR(255), 
    IN p_price DECIMAL(10,2)
)
BEGIN
    UPDATE product
    SET product_name = p_name, product_description = p_description, product_category = p_category, product_manufacturer = p_manufacturer, product_weight = p_weight, product_dimension = p_dimension, product_price = p_price
    WHERE product_id = p_id;
END

CREATE PROCEDURE updateStockByID(
    IN s_id INT,
    IN s_product_id INT,
    IN s_warehouse_id INT,
    IN s_name VARCHAR(255),
    IN s_quantity INT,
    IN s_expiration_data DATE
)
BEGIN
    DECLARE warehouse_exists INT;
    SELECT COUNT(*) INTO warehouse_exists FROM warehouse WHERE warehouse_id = s_warehouse_id;

    IF warehouse_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot update stock. Warehouse does not exist.';
    ELSE
        UPDATE stock
        SET stock_product_id = s_product_id, stock_warehouse_id = s_warehouse_id, stock_name = s_name, stock_quantity = s_quantity, stock_expiration_date = s_expiration_data
        WHERE stock_id = s_id;
    END IF;
END

CREATE PROCEDURE removeWarehouseByID(
    IN w_id INT
)
BEGIN
    DELETE FROM warehouse WHERE warehouse_id = w_id;
END

CREATE PROCEDURE removeProductByID(
    IN p_id INT
)
BEGIN
    DELETE FROM product WHERE product_id = p_id;
END

CREATE PROCEDURE removeStockByID(
    IN s_id INT
)
BEGIN
    DELETE FROM stock WHERE stock_id = s_id;
END

DELIMITER ;