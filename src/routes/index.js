const express = require('express');

const router = express.Router();

const usersRoutes = require('./usersRoutes');

router.use(usersRoutes);

module.exports = router;
