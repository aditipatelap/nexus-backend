const express = require('express');
const router = express.Router();
const addController = require('../Controller/product/addController');
const getController = require('../Controller/product/getController');
const updateController = require('../Controller/product/updateController');
const deleteController = require('../Controller/product/deleteController');
const getAllController = require('../Controller/product/getAllController');

// seller side
router.post('/add', addController.handleNewProduct);
router.post('/get', getController.handleGetProduct);
router.put('/update', updateController.handleUpdateProduct);
router.delete('/delete', deleteController.handleDeleteProduct);


// customer side
router.get('/get/all', getAllController.handleGetAllProducts);

module.exports = router;