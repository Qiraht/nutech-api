const express = require('express');
const container = require('../container');
const authenticationMiddleware = require('../middlwares/AuthenticationMiddleware');

const router = express.Router();

const informationController = container.resolve('informationController');

// get /banner
router.get('/banner', informationController.getBannerController);

// get /services
router.get(
  '/services',
  authenticationMiddleware,
  informationController.getServicesController,
);

module.exports = router;
