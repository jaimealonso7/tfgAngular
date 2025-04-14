const multer = require('multer');
const path = require('path');

// Configurar dónde y con qué nombre se guardarán las imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/marcas/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Evita nombres repetidos
    }
});

const upload = multer({ storage });

module.exports = upload;
