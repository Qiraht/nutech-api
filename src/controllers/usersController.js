const autoBind = require('auto-bind');

class UsersController {
  constructor({ userService }) {
    this._service = userService;

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

    res.status(200).json({
      status: 0,
      message: 'Login Sukses',
      data: null,
    })
  }
}

module.exports = UsersController;
