const autoBind = require('auto-bind');
const InvariantError = require('../exceptions/InvariantError');

class UsersController {
  constructor({ userService, tokenManager }) {
    this._service = userService;
    this._tokenManager = tokenManager;

    autoBind(this);
  }

  async postRegistrationController(req, res) {
    const { email, first_name, last_name, password } = req.body;

    await this._service.verifyNewEmail(email);

    await this._service.registerUser({
      email,
      first_name,
      last_name,
      password,
    });

    res.status(200).json({
      status: 0,
      message: 'Registrasi berhasil silahkan login',
      data: null,
    });
  }

  async postLoginController(req, res) {
    const { email, password } = req.body;

    await this._service.verifyUserCredential(email, password);

    const token = this._tokenManager.generateToken(email);

    res.status(200).json({
      status: 0,
      message: 'Login Sukses',
      data: token,
    });
  }

  async getProfileController(req, res) {
    const user = req.user.payload;

    const profile = await this._service.getProfileByEmail(user);

    res.status(200).json({
      status: 0,
      message: 'Sukses',
      data: {
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        profile_image: profile.profile_image,
      },
    });
  }

  async putProfileController(req, res) {
    const user = req.user.payload;
    const { first_name, last_name } = req.body;

    await this._service.editProfileByEmail(user, { first_name, last_name });

    const profile = await this._service.getProfileByEmail(user);

    res.status(200).json({
      status: 0,
      message: 'Sukses',
      data: profile,
    });
  }

  async putProfileImageController(req, res) {
    const user = req.user.payload;

    if (!req.file) {
      throw new InvariantError('Tidak ada file yang diupload');
    }

    const fileUrl = `/public/uploads/${req.file.filename}`;

    await this._service.editProfilePictureByEmail(user, fileUrl);
    const profile = await this._service.getProfileByEmail(user);

    res.status(200).json({
      status: 0,
      message: 'Sukses',
      data: {
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        profile_image: profile.profile_image,
      },
    });
  }
}

module.exports = UsersController;
