const InvariantError = require('../../exceptions/InvariantError');
const { nanoid } = require('nanoid');

class TransactionsServices {
  constructor({ pool }) {
    this._pool = pool;
  }

  async getUserBalance(email) {
    const query = {
      text: 'SELECT balance FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async addUserBalance(email, amount) {
    const query = {
      text: `UPDATE users
            SET balance = balance + $1
            WHERE email = $2
            RETURNING balance`,
      values: [amount, email],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async createTransaction({ userId, service, description, amount }) {
    // automatically asssign it as payment
    let type = 'PAYMENT';

    if (!service) {
      type = 'TOPUP';
      description = type.toLowerCase();
    }

    const id = `trx-${nanoid(16)}`;
    const invoice = `INV-${Date.now()}`;
    const createdOn = new Date().toISOString();
    const desc = description.toLowerCase();

    const query = {
      text: `INSERT INTO transactions (id, invoice_number, user_id, service_id,
      transaction_type, description, total_amount, created_on)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *`,
      values: [id, invoice, userId, service, type, desc, amount, createdOn],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async subtractUserBalance(email, amount) {
    const query = {
      text: 'UPDATE users SET balance = balance - $1 WHERE email = $2 AND balance >= $1',
      values: [amount, email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Saldo tidak mencukupi');
    }
  }

  async getTransactionByInvoice(invoice) {
    const query = {
      text: `SELECT tr.invoice_number, s.code, s.name, tr.transaction_type, tr.total_amount, tr.created_on
      FROM transactions AS tr LEFT JOIN services AS s ON s.id = tr.service_id
      WHERE invoice_number = $1`,
      values: [invoice],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getTransactionsByUserId(userId, limit, offset) {
    if (!limit) {
      limit = 10;
    }

    const query = {
      text: `SELECT invoice_number, transaction_type, description, total_amount, created_on
      FROM transactions AS tr INNER JOIN users AS s ON s.id = tr.user_id
      WHERE s.id = $1
      LIMIT $2 OFFSET $3`,
      values: [userId, limit, offset],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = TransactionsServices;
