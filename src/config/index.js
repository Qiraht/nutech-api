require('dotenv').config();

const config = {
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  psql: {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },
};

module.exports = config;
