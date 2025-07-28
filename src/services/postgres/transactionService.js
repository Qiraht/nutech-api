const InvariantError = require('../../exceptions/InvariantError');
const { nanoid } = require('nanoid');

class TransactionsServices {
  constructor({ pool }) {
    this._pool = pool;
  }

  async getUserBalance(email) {
    const query = {
      text: `SELECT balance FROM users WHERE email = $1`,
      value: [email],
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
      value: [amount, email],
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
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const invoice = `INV${dateStr}}`;
    const createdOn = new Date().toISOstring();
    const desc = description.toLowerCase();

    const query = {
      text: `INSERT INTO transactions (id, invoice_number, user_id, service_id, 
      transaction_type, description, total_amount, created_on)
      VALUES ($1, $2, $3, $4, $5, $6, $7 $8)
      RETURNING invoice_number`,
      value: [id, invoice, userId, service, type, desc, amount, createdOn],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async subtractUserBalance(email, balance, service) {
    const amount = service.tariff;
    if (amount > balance) {
      throw new InvariantError('Saldo tidak cukup');
    }

    const query = {
      text: `UPDATE users
            SET balance = balance - $1
            WHERE email = $2
            RETURNING balance`,
      value: [amount, email],
    };

    await this._pool.query(query);
  }

  async getTransactionByInvoice(invoice) {
    const query = {
      text: `SELECT tr.invoice_number, s.service_code, s.service_name, tr.transaction_type, tr.total_amount, tr.created_on
      FROM transactions AS tr LEFT JOIN services AS s ON s.id = tr.service_id
      WHERE invoice_number = $1`,
      value: [invoice],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getTransactionsByUserId(userId, limit, offset) {
    const query = {
      text: `SELECT invoice_number, transaction_type, description, total_amount, created_on
      FROM transactions AS tr INNER JOIN users AS s ON s.id = tr.user_id
      WHERE s.id = $1
      LIMIT $2 OFFSET $3`,
      value: [userId, limit, offset],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = TransactionsServices;
