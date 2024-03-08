CREATE TABLE IF NOT EXISTS warehouse(
    warehouse_id INT AUTO_INCREMENT PRIMARY KEY,
    warehouse_name VARCHAR(100) NOT NULL,
    warehouse_address VARCHAR(255) NOT NULL,
    warehouse_manager VARCHAR(100) NOT NULL,
    warehouse_maximum_capacity INT NOT NULL,
    warehouse_current_capacity INT NOT NULL,
    warehouse_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    warehouse_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stock(
    stock_id INT AUTO_INCREMENT PRIMARY KEY,
    stock_product_id INT NOT NULL,
    stock_warehouse_id INT NOT NULL,
    stock_name VARCHAR(100) NOT NULL,
    stock_quantity INT NOT NULL,
    stock_price DECIMAL(10,2) NOT NULL,
    stock_expiration_date DATE NOT NULL,
    stock_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    stock_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (stock_product_id) REFERENCES product(product_id),
    FOREIGN KEY (stock_warehouse_id) REFERENCES warehouse(warehouse_id)
);

CREATE TABLE IF NOT EXISTS product(
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_description TEXT NOT NULL,
    product_category VARCHAR(100) NOT NULL,
    product_manufacturer VARCHAR(100) NOT NULL,
    product_weight DECIMAL(10,2) NOT NULL,
    product_dimension VARCHAR(100) NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    product_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    product_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TRIGGERS FOR STOCK

CREATE TRIGGER IF NOT EXISTS add_stock_price
AFTER INSERT ON stock
FOR EACH ROW
BEGIN
    UPDATE stock
    SET stock_price = NEW.stock_quantity * (SELECT product_price FROM product WHERE product_id = NEW.stock_product_id)
    WHERE stock_product_id = NEW.product_id;
END;

CREATE TRIGGER IF NOT EXISTS update_stock_price
AFTER UPDATE ON product
FOR EACH ROW
BEGIN
    UPDATE stock
    SET stock_price = NEW.product_price * stock_quantity
    WHERE stock_product_id = NEW.product_id;
END;

CREATE TRIGGER IF NOT EXISTS remove_stock
AFTER DELETE ON product
FOR EACH ROW
BEGIN
    DELETE FROM stock
    WHERE stock_product_id = OLD.product_id;
END;

-- TRIGGERS FOR WAREHOUSE

CREATE TRIGGER IF NOT EXISTS check_warehouse_capacity
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
END;

CREATE TRIGGER IF NOT EXISTS update_warehouse_capacity
AFTER INSERT ON stock
FOR EACH ROW
BEGIN
    UPDATE warehouse
    SET warehouse_current_capacity = warehouse_current_capacity + NEW.stock_quantity
    WHERE warehouse_id = NEW.stock_warehouse_id;
END;

CREATE TRIGGER IF NOT EXISTS remove_warehouse_capacity
AFTER DELETE ON stock
FOR EACH ROW
BEGIN
    UPDATE warehouse
    SET warehouse_current_capacity = warehouse_current_capacity - OLD.stock_quantity
    WHERE warehouse_id = OLD.stock_warehouse_id;
END;