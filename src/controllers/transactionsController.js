const autoBind = require('auto-bind');

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
  }

  async postTopUpController(req, res) {
    const email = req.user.payload;
    const { top_up_amount: amount } = req.body;

    const user = await this._userService.getProfileByEmail(email);
    const topup = await this._service.addUserBalance(email, amount);
    const invoice = await this._service.createTransaction({
      userId: user.id,
      service: null,
      description: null,
      amount: amount,
    });

    console.log(invoice);

    res.status(200).json({
      status: 0,
      message: 'Top Up Balance berhasil',
      data: topup,
    });
  }

  async postTransactionController(req, res) {
    const email = req.user.payload;
    const code = req.body.service_code;

    const service = await this._informationService.getServiceByCode(code);
    const user = await this._userService.getProfileByEmail(email);
    await this._service.subtractUserBalance(email, service.tariff);

    const invoice = await this._service.createTransaction({
      userId: user.id,
      service: service.id,
      description: service.code,
      amount: service.tariff,
    });

    const result = await this._service.getTransactionByInvoice(
      invoice.invoice_number,
    );

    res.status(200).json({
      status: 0,
      message: 'Transkasi berhasil',
      data: result,
    });
  }

  async getTransactionHistoryController(req, res) {
    const email = req.user.payload;
    const limit = req.query.limit || 0;
    const offset = req.query.offset || 0;

    const user = await this._userService.getProfileByEmail(email);

    const result = await this._service.getTransactionsByUserId(
      user.id,
      limit,
      offset,
    );

    res.status(200).json({
      status: 0,
      message: 'Transkasi berhasil',
      data: {
        offset: offset,
        limit: limit,
        records: result,
      },
    });
  }
}

module.exports = TransactionsController;
