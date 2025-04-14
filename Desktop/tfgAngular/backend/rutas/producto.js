const express = require('express');
const { getProducts } = require('../servicio/productoServicio');
const upload = require('../middlewares/upload');
const router = express.Router();
const { connectToDatabase } = require('../config/db');



// Ruta para obtener todos los productos
router.get('/productos', async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch(error) {
        res.status(500).json({message: 'Error al obtener los productos'});
    }
});

router.post('/upload', upload.single('imagen'), (req, res) => {
    try{
        const filePath = 'images/marcas/' + req.file.filename;
        // Guardar en la base de datos la ruta de la imagen
        const query = 'INSERT INTO marcas (nombre, imagen) VALUES (?, ?)';
        db.execute(query, [req.body.nombre, filePath]);
        res.json({ message: 'Imagen subida correctamente', file: req.file });
    } catch (error) {
        res.status(500).json({ message: 'Error al subir la imagen', error });
    }
});

module.exports = router;