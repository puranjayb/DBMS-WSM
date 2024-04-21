const connection = require('../databaseConfig/db');

const addProduct = (req, res) => {
    const { product_name, product_description, product_category, product_manufacturer, product_weight, product_dimension, product_price } = req.body;
    connection.query('CALL addProduct(?, ?, ?, ?, ?, ?, ?)', [product_name, product_description, product_category, product_manufacturer, product_weight, product_dimension, product_price], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send('Error in adding product');
        }
        console.log(result);
        res.status(200).send('Product added successfully');
    });
}

const addWarehouse = (req, res) => {
    const { warehouse_name, warehouse_address, warehouse_manager, warehouse_maximum_capacity } = req.body;
    connection.query('CALL addWarehouse(?, ?, ?, ?)', [warehouse_name, warehouse_address, warehouse_manager, warehouse_maximum_capacity], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send('Error in adding warehouse');
        }
        console.log(result);
        res.status(200).send('Warehouse added successfully');
    });
}

const addStock = (req, res) => {
    const { stock_product_id, stock_warehouse_id, stock_name, stock_quantity, stock_expiration_date } = req.body;
    connection.query('CALL addStock(?, ?, ?, ?, ?)', [stock_product_id, stock_warehouse_id, stock_name, stock_quantity, stock_expiration_date], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send('Error in adding stock');
        }
        console.log(result);
        res.status(200).send('Stock added successfully');
    });
}

module.exports = { addProduct, addWarehouse, addStock };
