const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DB_URL.srv-d633b6u3jp1c73e04bsg,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;