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

    async addUserBalance(email) {}

    /*
    ** 1. Check Transaction Code,
    ** 2. get UserId,
    ** 3.
    */
    async createTransaction({userId, transactionCode, totalAmount}) {
    }
}

module.exports = TransactionsServices;