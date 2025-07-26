const autoBind = require('auto-bind');

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
      data: profile,
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
}

module.exports = UsersController;
