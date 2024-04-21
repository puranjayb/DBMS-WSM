const getService = require('../services/getService');
const postService = require('../services/postService');
const putService = require('../services/putService');
const deleteService = require('../services/deleteService'); 

const router = require('express').Router();

router.get('/getWarehouseDetails', getService.getWarehouseDetails);
router.get('/getStockDetails', getService.getStockDetails);
router.get('/getProductDetails', getService.getProductDetails);

router.post('/addWarehouse', postService.addWarehouse);
router.post('/addStock', postService.addStock);
router.post('/addProduct', postService.addProduct);

router.put('/updateWarehouse', putService.updateWarehouseByID);
router.put('/updateStock', putService.updateStockByID);
router.put('/updateProduct', putService.updateProductByID);

router.delete('/deleteWarehouse', deleteService.deleteWarehouseByID);
router.delete('/deleteStock', deleteService.deleteStockByID);
router.delete('/deleteProduct', deleteService.deleteProductByID);

module.exports = router;