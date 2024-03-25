const express = require('express');
const router = express.Router();
const loginController = require('../Controller/customer/loginController');
const authController = require('../Controller/customer/authController');
const registerController = require('../Controller/customer/registerController');
const deleteController = require('../Controller/customer/deleteController');
const updateProfileController = require('../Controller/customer/updateProfileController');


router.post('/login', loginController.handleLoginCustomer);
router.post('/auth', authController.handleNewCustomer);
router.post('/register', registerController.handleRegisterCustomer);
router.delete('/delete', deleteController.handleDeleteCustomer);
router.put('/update/profile', updateProfileController.handleUpdateCustomerProfile);

module.exports = router;