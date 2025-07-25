const express = require('express');
const container = require('../container');
const validateRequestBody = require('../middlwares/ValidateRequestBody');
const RegisterPayloadSchema = require('../validator/usersSchema');

const router = express.Router();

const userController = container.resolve('userController');

// post /Registration
router.post(
  '/registration',
  validateRequestBody(RegisterPayloadSchema),
  userController.postRegistrationController,
);

// post /login
router.post('/login', async (req, res) => {
  res.json({ message: 'Still In Progress!' });
});

// get /Profile
router.get('/profile', async (req, res) => {
  res.json({ message: 'Still In Progress!' });
});

// put /Profile/Update
router.put('/profile/update', async (req, res) => {
  res.json({ message: 'Still In Progress!' });
});

// put /Profile/image
router.put('/profile/update', async (req, res) => {
  res.json({ message: 'Still In Progress!' });
});

module.exports = router;
