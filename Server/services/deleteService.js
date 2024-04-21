const connection = require('../databaseConfig/db')

const deleteWarehouseByID = (req, res) => {
    const { warehouse_id } = req.body;
    connection.query('CALL removeWarehouseByID(?)', [warehouse_id], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send('Error in deleting warehouse');
        }
        console.log(result);
        res.status(200).send('Warehouse deleted successfully');
    });
}

const deleteStockByID = (req, res) => {
    const { stock_id } = req.body;
    connection.query('CALL removeStockByID(?)', [stock_id], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send('Error in deleting stock');
        }
        console.log(result);
        res.status(200).send('Stock deleted successfully');
    });
}

const deleteProductByID = (req, res) => {
    const { product_id } = req.body;
    connection.query('CALL removeProductByID(?)', [product_id], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send('Error in deleting product');
        }
        console.log(result);
        res.status(200).send('Product deleted successfully');
    });
}

module.exports = { deleteWarehouseByID, deleteStockByID, deleteProductByID };