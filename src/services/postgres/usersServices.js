const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersServices {
  constructor({ pool }) {
    this._pool = pool;
  }

  async registerUser({ email, first_name, last_name, password }) {
    // create id using nanoid
    const id = `user-${nanoid(16)}`;

    // add date using js date function, timestamptz support iso string
    const createdAt = new Date().toISOString();

    // hashing password for security with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: `INSERT INTO users (id, email, password, first_name, last_name, created_at)
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING id`,
      values: [id, email, hashedPassword, first_name, last_name, createdAt],
    };

    await this._pool.query(query);
  }

  async verifyNewEmail(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError('Email sudah terdaftar');
    }
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT email, password FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError('Username atau password salah');
    }

    const { password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Username atau password salah');
    }
  }

  async getProfileByEmail(email) {
    const query = {
      text: `SELECT id, email, first_name, last_name, profile_image
      FROM users WHERE email = $1`,
      values: [email],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async editProfileByEmail(email, { first_name, last_name }) {
    const query = {
      text: `UPDATE users SET first_name= $1, last_name = $2
      WHERE email = $3 RETURNING email, first_name, last_name`,
      values: [first_name, last_name, email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal memperbarui profile');
    }

    return result.rows[0];
  }

  async editProfilePictureByEmail(email, fileUrl) {
    const query = {
      text: `UPDATE users SET profile_image = $1
      WHERE email = $2 RETURNING profile_image`,
      values: [fileUrl, email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Upload image gagal');
    }

    return result.rows[0];
  }
}

module.exports = UsersServices;
