const express = require("express");
const container = require("../container");

const router = express.Router();

const informationController = container.resolve('informationController');

// get /banner
router.get('/banner', informationController.getBannerContoller);

// get /services
router.get('/services', async (req, res) => {
    res.json({ message: 'WIP!' });
})

module.exports = router;