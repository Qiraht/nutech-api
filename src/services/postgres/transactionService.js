class TransactionsServices {
    constructor({ pool }) {
        this._pool = pool;
    }

    async getUserBalance(email) {
        const query = {
            text: `SELECT balance FROM users WHERE email = $1`,
            value: [email],
        }

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

    /*
    ** 1. Check Transaction Code,
    ** 2. get UserId,
    ** 3.
    */
    async createTransaction({userId, transactionCode}) {
    }
}

module.exports = TransactionsServices;