const express = require('express');

const router = express.Router();

const usersRoutes = require('./usersRoutes');
const informationsRoutes = require('./informationsRoutes');
const transactionsRoutes = require('./transactionsRoutes');

router.use(usersRoutes);
router.use(informationsRoutes);
router.use(transactionsRoutes);

module.exports = router;
