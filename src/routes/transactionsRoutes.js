const express = require('express');
const container = require('../container');
const authenticationMiddleware = require('../middlwares/AuthenticationMiddleware');
const validateRequestBody = require('../middlwares/ValidateRequestBody');
const { TopUpPayloadSchema } = require('../validator/transactionsSchema');

const router = express.Router();

const transactionController = container.resolve('transactionController');

// get /balance
router.get(
  '/balance',
  authenticationMiddleware,
  transactionController.getBalanceController,
);

// post /topup
router.post('/topup', validateRequestBody(TopUpPayloadSchema), authenticationMiddleware, transactionController.postTopUpController);

// post /transatcion
router.post('/transaction', async (req, res) => {
  res.json({ message: 'WIP!' });
});

// get /transaction/history/
router.get('/transaction/history', async (req, res) => {
    res.json({ message: 'WIP!'});
})

module.exports = router;
