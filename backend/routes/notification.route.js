const express = require('express');
const router = express.Router();
const ratingsController = require('../controllers/ratingsController');
const notificationController = require('../controllers/notification.controller');

router.post('/investors', notificationController.sendNotification);

module.exports = router;