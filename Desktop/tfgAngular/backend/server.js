const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./config/db'); // ✅ Usa pool en lugar de db

require('dotenv').config();

console.log('Configuración de la base de datos:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const app = express();

app.use(cors());
app.use(express.json());

// ✅ CORRECCIÓN en la API de marcas
app.get('/api/marcas', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT idMarca, nombre, imagen, ruta FROM marcas'); // ✅ pool en lugar de db
    if (rows.length > 0) {
      res.json(rows);
    } else {
      console.error('No se encontraron marcas');
      res.status(404).json({ message: 'No se encontraron marcas' });
    }
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    res.status(500).json({ message: 'Error al obtener marcas', error: error.message });
  }
});

// ✅ API de productos
app.get('/api/productos', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM productos'); // ✅ pool en lugar de db
    res.json(rows);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
});

// ✅ API de usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM usuarios'); // ✅ pool en lugar de db
    res.json(rows);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
