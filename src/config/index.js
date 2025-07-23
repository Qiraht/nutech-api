require('dotenv').config();

const config = {
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
};

module.exports = config;