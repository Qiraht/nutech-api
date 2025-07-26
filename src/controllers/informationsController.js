const autoBind = require("auto-bind");

class InformationsController {
    constructor({ informationService }) {
        this._service = informationService;

        autoBind(this);
    }

    async getBannerController(req, res) {
        const result = await this._service.getAllBanners();

        res.status(200).json({
            status: 0,
            message: 'Sukses',
            data: result,
        })
    }

    async getServicesController(req, res) {
        const result = await this._service.getAllServices();

        res.status(200).json({
          status: 0,
          message: 'Sukses',
          data: result,
        });
    }
}

module.exports = InformationsController;
