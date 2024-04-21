const connection = require('../databaseConfig/db')

const updateWarehouseByID = (req, res) => {
    const { warehouse_id, warehouse_name, warehouse_address, warehouse_manager, warehouse_maximum_capacity } = req.body;
    connection.query('CALL updateWarehouseByID(?, ?, ?, ?, ?)', [warehouse_id, warehouse_name, warehouse_address, warehouse_manager, warehouse_maximum_capacity], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send('Error in updating warehouse');
        }
        console.log(result);
        res.status(200).send('Warehouse updated successfully');
    });
}

const updateStockByID = (req, res) => {
    
    const { stock_id, stock_product_id, stock_warehouse_id, stock_name, stock_quantity, stock_expiration_date } = req.body;
    connection.query('CALL updateStockByID(?, ?, ?, ?, ?, ?)', [stock_id, stock_product_id, stock_warehouse_id, stock_name, stock_quantity, stock_expiration_date], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send('Error in updating stock');
        }
        console.log(result);
        res.status(200).send('Stock updated successfully');
    });
}

const updateProductByID = (req, res) => {
    const { product_id, product_name, product_description, product_category, product_manufacturer, product_weight, product_dimension, product_price} = req.body;
    connection.query('CALL updateProductByID(?, ?, ?, ?, ?, ?, ?, ?)', [product_id, product_name, product_description, product_category, product_manufacturer, product_weight, product_dimension, product_price], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send('Error in updating product');
        }
        console.log(result);
        res.status(200).send('Product updated successfully');
    });
}

module.exports = { updateWarehouseByID, updateStockByID, updateProductByID };