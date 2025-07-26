class InformationsServices {
    constructor({ pool }) {
        this._pool = pool;
    }

    async getAllBanners() {
        const query = {
            text: `SELECT banner_name, banner_image, description
            FROM banner`
        }

        const result = await this._pool.query(query);

        return result.rows;
    }

    async getAllServices() {
        const query = {
          text: `SELECT service_code, service_name, service_icon, service_tariff
            FROM services`,
        };

        const result = await this._pool.query(query);

        return result.rows;
    }
}

module.exports = InformationsServices;