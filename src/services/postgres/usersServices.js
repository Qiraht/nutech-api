const { Pool } = require("pg");

class UsersService {
    constructor() {
        this._pool =  new Pool();
    }

    async addUsers() {};

    async addLogin() {};

    async getProfile() {};

    async updateProfile() {};

    async updateProfileImage() {};
};

module.exports = UsersService;
