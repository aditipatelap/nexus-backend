const express = require('express');
const router = express.Router();
const addController = require('../Controller/order/addController');
const getController = require('../Controller/order/getController');
const getOrderForAgentController = require('../Controller/order/getOrderForAgentController');
const updateController = require('../Controller/order/updateController');
const trackController = require('../Controller/order/trackController');


router.post('/new', addController.handleCreateOrder);
router.post('/get', getController.handleGetOrder); // seller side
router.post('/get/agent', getOrderForAgentController.handleGetOrder); // agent side
router.post('/track', trackController.handleTrackOrder);
router.put('/update', updateController.handleUpdateOrder);

module.exports = router;