const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

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

  async addLogin() {}

  async getProfile() {}

  async updateProfile() {}

  async updateProfileImage() {}
}

module.exports = UsersServices;
