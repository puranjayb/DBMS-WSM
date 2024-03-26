const express = require('express');
const controller = require('./controllers/wsm_controller');
require('dotenv').config();

const app = express();
// Base Queries
app.get('/getWarehouseDetails', controller.getWarehouseDetails);
app.get('/getStockDetails', controller.getStockDetails);
app.get('/getProductDetails', controller.getProductDetails);

app.post('/addWarehouse', controller.addWarehouse);
app.post('/addStock', controller.addStock);
app.post('/addProduct', controller.addProduct);

app.put('/updateWarehouse', controller.updateWarehouse);
app.put('/updateStock', controller.updateStock);
app.put('/updateProduct', controller.updateProduct);

app.delete('/deleteWarehouse', controller.deleteWarehouse);
app.delete('/deleteStock', controller.deleteStock);
app.delete('/deleteProduct', controller.deleteProduct);

// Custom Queries
app.get('/getWarehouseStock', controller.getWarehouseStock);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
