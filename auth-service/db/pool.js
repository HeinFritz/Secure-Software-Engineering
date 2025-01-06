require('dotenv').config();
const { Pool } = require('pg');

module.exports = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  max: 10,
  idleTimeoutMillis: 30000,
});
