const express = require('express');
const router = express.Router();
const addController = require('../Controller/order/addController');
const getController = require('../Controller/order/getController');
const updateController = require('../Controller/order/updateController');


router.post('/new', addController.handleCreateOrder);
router.post('/get', getController.handleGetOrder);
router.put('/update', updateController.handleUpdateOrder);

module.exports = router;