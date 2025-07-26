const express = require('express');

const router = express.Router();

const usersRoutes = require('./usersRoutes');
const informationsRoutes = require('./informationsRoutes');


router.use(usersRoutes);
router.use(informationsRoutes);

module.exports = router;
