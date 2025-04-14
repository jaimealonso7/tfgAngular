const mysql = require('mysql2/promise');  // Usa mysql2/promise
require('dotenv').config();

// Crear una conexión utilizando mysql2/promise
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// No necesitas connection.connect() cuando usas mysql2/promise

module.exports = pool;
