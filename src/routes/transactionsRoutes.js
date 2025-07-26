const express = require('express');

const router = express.Router();

// get /balance
router.get('/balance', async (req, res) => {
    res.json({message: 'WIP!'});
});

// post /topup
router.post('/topup', async (req, res) => {
  res.json({ message: 'WIP!' });
});

// post /transatcion
router.post('/transaction', async (req, res) => {
  res.json({ message: 'WIP!' });
});

// get /transaction/history/
router.get('/transaction/history', async (req, res) => {
    res.json({ message: 'WIP!'});
})

module.exports = router;
