const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.post('/add', portfolioController.addPortfolio);

module.exports = router;