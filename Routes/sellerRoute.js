const express = require('express');
const router = express.Router();
const loginController = require('../Controller/seller/loginController');
const forgotPassController = require('../Controller/seller/forgotPassController');
const authController = require('../Controller/seller/authController');
const registerController = require('../Controller/seller/registerController');
const deleteController = require('../Controller/seller/deleteController');
const updateProfileController = require('../Controller/seller/updateProfileController');


router.post('/login', loginController.handleLoginSeller);
router.post('/forgot-pass', forgotPassController.handleForgotPassword);
router.post('/auth', authController.handleNewSeller);
router.post('/register', registerController.handleRegisterSeller);
router.delete('/delete', deleteController.handleDeleteSeller);
router.put('/update/profile', updateProfileController.handleUpdateSellerProfile);

module.exports = router;