const connection = require('../databaseConfig/db');

const getWarehouseDetails = (req, res) => {
    connection.query('CALL getWarehouseDetails', (err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send('Error in fetching warehouse details');
        }
        console.log(result);
        res.status(200).send(result[0]);
    });
}

const getStockDetails = (req, res) => {
    connection.query('CALL getStockDetails', (err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send('Error in fetching stock details');
        }
        console.log(result);
        res.status(200).send(result[0]);
    });
}

const getProductDetails = (req, res) => {
    connection.query('CALL getProductDetails', (err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send('Error in fetching product details');
        }
        console.log(result);
        res.status(200).send(result[0]);
    });
}

module.exports = {getWarehouseDetails, getStockDetails, getProductDetails};