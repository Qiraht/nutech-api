const autoBind = require("auto-bind");

class TransactionsController {
    constructor({ transacstionService }) {
        this._transactionService = transacstionService;

        autoBind(this);
    }

    async getBalanceController(req, res) {
        const user = req.user.payload;

        const balance = await this._transactionService.getUserBalance(user);

        res.status(200).json({
            status: 0,
            message: 'Get Balance Berhasil',
            data: balance,
        });
    };


}

module.exports = TransactionsController;