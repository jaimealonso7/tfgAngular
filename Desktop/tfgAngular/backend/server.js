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

// Middleware de CORS
app.use(cors({
  origin: 'http://localhost:4200',  // Cambia esta URL si tu frontend está en otra URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para manejar la política de seguridad COOP y COEP
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Middleware para procesar JSON
app.use(express.json());  

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Configura el puerto y ejecuta el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


/*require('dotenv').config();

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
app.use(express.json());  
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});*/