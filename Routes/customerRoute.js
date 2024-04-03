const express = require('express');
const router = express.Router();
const loginController = require('../Controller/customer/loginController');
const authController = require('../Controller/customer/authController');
const registerController = require('../Controller/customer/registerController');
const deleteController = require('../Controller/customer/deleteController');
const updateProfileController = require('../Controller/customer/updateProfileController');
const favAddController = require('../Controller/customer/favAddController');
const favRemoveController = require('../Controller/customer/favRemoveController');
const bagAddController = require('../Controller/customer/bagAddController');
const bagRemoveController = require('../Controller/customer/bagRemoveController');


router.post('/login', loginController.handleLoginCustomer);
router.post('/auth', authController.handleNewCustomer);
router.post('/register', registerController.handleRegisterCustomer);
router.delete('/delete', deleteController.handleDeleteCustomer);
router.put('/update/profile', updateProfileController.handleUpdateCustomerProfile);

router.put('/favorite/add', favAddController.handleAddFavorite);
router.delete('/favorite/remove', favRemoveController.handleRemoveFavorite);

router.put('/bag/add', bagAddController.handleAddBag);
router.delete('/bag/remove', bagRemoveController.handleRemoveBag);

module.exports = router;