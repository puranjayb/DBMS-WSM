CREATE TABLE IF NOT EXISTS warehouse (
    warehouse_id INT AUTO_INCREMENT PRIMARY KEY,
    warehouse_name VARCHAR(100) NOT NULL,
    warehouse_address VARCHAR(255) NOT NULL,
    warehouse_manager VARCHAR(100) NOT NULL,
    warehouse_maximum_capacity INT NOT NULL,
    warehouse_current_capacity INT NOT NULL DEFAULT 0,
    warehouse_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    warehouse_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_description TEXT NOT NULL,
    product_category VARCHAR(100) NOT NULL,
    product_manufacturer VARCHAR(100) NOT NULL,
    product_weight DECIMAL(10 , 2 ) NOT NULL,
    product_dimension VARCHAR(100) NOT NULL,
    product_price DECIMAL(10 , 2 ) NOT NULL,
    product_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    product_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stock (
    stock_id INT AUTO_INCREMENT PRIMARY KEY,
    stock_product_id INT NOT NULL,
    stock_warehouse_id INT NOT NULL,
    stock_name VARCHAR(100) NOT NULL,
    stock_quantity INT NOT NULL,
    stock_price DECIMAL(10, 2),
    stock_expiration_date DATE NOT NULL,
    stock_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    stock_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (stock_product_id)
        REFERENCES product (product_id),
    FOREIGN KEY (stock_warehouse_id)
        REFERENCES warehouse (warehouse_id)
);

DROP TRIGGER IF EXISTS add_stock_price;
DROP TRIGGER IF EXISTS update_stock_price;
DROP TRIGGER IF EXISTS remove_stock;
DROP TRIGGER IF EXISTS check_warehouse_capacity;
DROP TRIGGER IF EXISTS update_warehouse_capacity;
DROP TRIGGER IF EXISTS remove_warehouse_capacity;

-- TRIGGER FOR STOCK
DELIMITER //
CREATE TRIGGER add_stock_price
BEFORE INSERT ON stock 
FOR EACH ROW
BEGIN
    SET NEW.stock_price = NEW.stock_quantity * (SELECT product_price FROM product WHERE product_id = NEW.stock_product_id);
END//

CREATE TRIGGER update_stock_price
AFTER UPDATE ON product
FOR EACH ROW
BEGIN
    UPDATE stock
    SET stock_price = NEW.product_price * stock_quantity
    WHERE stock_product_id = NEW.product_id;
END//

CREATE TRIGGER remove_stock
AFTER DELETE ON product
FOR EACH ROW
BEGIN
    DELETE FROM stock
    WHERE stock_product_id = OLD.product_id;
END//

-- TRIGGER FOR WAREHOUSE
CREATE TRIGGER check_warehouse_capacity
BEFORE INSERT ON stock
FOR EACH ROW
BEGIN
    DECLARE warehouse_current_capacity INT;
    DECLARE warehouse_maximum_capacity INT;
    SELECT warehouse_current_capacity, warehouse_maximum_capacity INTO warehouse_current_capacity, warehouse_maximum_capacity
    FROM warehouse
    WHERE warehouse_id = NEW.stock_warehouse_id;
    IF warehouse_current_capacity + NEW.stock_quantity > warehouse_maximum_capacity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Warehouse is full';
    END IF;
END//

CREATE TRIGGER update_warehouse_capacity
AFTER INSERT ON stock
FOR EACH ROW
BEGIN
    UPDATE warehouse
    SET warehouse_current_capacity = warehouse_current_capacity + NEW.stock_quantity
    WHERE warehouse_id = NEW.stock_warehouse_id;
END//

CREATE TRIGGER remove_warehouse_capacity
AFTER DELETE ON stock
FOR EACH ROW
BEGIN
    UPDATE warehouse
    SET warehouse_current_capacity = warehouse_current_capacity - OLD.stock_quantity
    WHERE warehouse_id = OLD.stock_warehouse_id;
END//

DELIMITER ;

-- VIEWS
CREATE VIEW stock_view AS
    SELECT 
        s.stock_warehouse_id AS Warehouse_No,
        s.stock_id AS Stock_No,
        s.stock_product_id AS Product_No,
        w.warehouse_name AS Warehouse_Name,
        s.stock_name AS Stock_Name,
        p.product_name AS Product_Name,
        s.stock_quantity AS Quantity,
        s.stock_price AS Price,
        s.stock_expiration_date AS Expiry
    FROM
        stock s
            JOIN
        warehouse w ON s.stock_warehouse_id = w.warehouse_id
            JOIN
        product p ON s.stock_product_id = p.product_id;

CREATE VIEW warehouse_view AS
    SELECT 
        w.warehouse_id AS Warehouse_No,
        w.warehouse_name AS Warehouse_Name,
        w.warehouse_manager AS Manager,
        w.warehouse_maximum_capacity AS Max_Capacity,
        w.warehouse_current_capacity AS Current_Capacity
    FROM
        warehouse w;