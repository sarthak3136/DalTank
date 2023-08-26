const express = require('express');
const router = express.Router();
const investorProfileEditController = require('../controllers/investorProfileEdit');

router.post('/get', investorProfileEditController.getProfile);

router.put('/editUser', investorProfileEditController.editUser);

router.put('/editPortfolio', investorProfileEditController.editPortfolio);

module.exports = router;