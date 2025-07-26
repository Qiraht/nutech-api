const autoBind = require("auto-bind");

class TransactionsController {
    constructor({ transactionService, userService, informationService }) {
        this._service = transactionService;
        this._userService = userService;
        this._informationService = informationService;

        autoBind(this);
    }

    async getBalanceController(req, res) {
        const user = req.user.payload;

        const balance = await this._service.getUserBalance(user);

        res.status(200).json({
            status: 0,
            message: 'Get Balance Berhasil',
            data: balance,
        });
    };

    async postTopUpController(req, res) {
        const {user: email } = req.user.payload;

        const { top_up_amount: amount } = req.body;

        const topup = await this._service.addUserBalance(email, amount);

        res.status(200).json({
          status: 0,
          message: 'Top Up Balance berhasil',
          data: topup
        });
    }
}

module.exports = TransactionsController;