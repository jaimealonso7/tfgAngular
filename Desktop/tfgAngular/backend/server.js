

require('dotenv').config();

// Verifica que las variables de entorno se están cargando correctamente
console.log('Configuración de la base de datos:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

const express = require('express');
const cors = require('cors');


const authRoutes = require('./routes/auth');

const app = express();

// Middleware de CORS y JSON
app.use(cors());
app.use(express.json());  // Cambié bodyParser.json() por express.json()

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});