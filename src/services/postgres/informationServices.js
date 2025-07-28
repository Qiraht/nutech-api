const InvariantError = require('../../exceptions/InvariantError');

class InformationsServices {
  constructor({ pool, mapBannerToModel, mapServicesToModel }) {
    this._pool = pool;
    this._mapBanner = mapBannerToModel;
    this._mapService = mapServicesToModel;
  }

  async getAllBanners() {
    const query = {
      text: `SELECT name, image, description
            FROM banner`,
    };

    const result = await this._pool.query(query);

    return result.rows.map(this._mapBanner);
  }

  async getAllServices() {
    const query = `SELECT code, name, icon, tariff
            FROM services`;

    const result = await this._pool.query(query);

    return result.rows.map(this._mapService);
  }

  async getServiceByCode(code) {
    const query = {
      text: `SELECT * FROM services
            WHERE service_code = $1`,
      value: [code],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Service ataus Layanan tidak ditemukan');
    }

    return result.rows[0];
  }
}

module.exports = InformationsServices;
