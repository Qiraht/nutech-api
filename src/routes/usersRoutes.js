const express = require('express');
const container = require('../container');
const validateRequestBody = require('../middlewares/ValidateRequestBody');
const authenticationMiddleware = require('../middlewares/AuthenticationMiddleware');
const upload = require('../middlewares/UploadsMidlleware');
const { RegisterPayloadSchema, LoginPayloadSchema, EditProfilePayloadSchema } = require('../validator/schemas');

const router = express.Router();

const userController = container.resolve('userController');

// post /Registration
router.post(
  '/registration',
  validateRequestBody(RegisterPayloadSchema),
  userController.postRegistrationController,
);

// post /login
router.post(
  '/login',
  validateRequestBody(LoginPayloadSchema),
  userController.postLoginController,
);

// get /Profile
router.get(
  '/profile',
  authenticationMiddleware,
  userController.getProfileController,
);

// put /Profile/Update
router.put(
  '/profile/update',
  authenticationMiddleware,
  validateRequestBody(EditProfilePayloadSchema),
  userController.putProfileController,
);

// put /Profile/image
router.put(
  '/profile/image',
  authenticationMiddleware,
  upload.single('file'),
  userController.putProfileImageController,
);

module.exports = router;
