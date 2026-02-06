const pool = require('../db.js');

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      level VARCHAR(20) DEFAULT 'usuario' CHECK (level IN ('admin', 'usuario')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
};

const createUser = async (name, email, password, level = 'usuario') => {
  const query = `
    INSERT INTO users (name, email, password, level)
    VALUES ($1, $2, $3, $4) RETURNING id, name, email, level
  `;
  const result = await pool.query(query, [name, email, password, level]);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

module.exports = { createUserTable, createUser, findUserByEmail };