const { connectToDatabase } = require('../config/db');

// Obtener todos los productos de la base de datos
async function getProducts() {
    let connection;
    try {
        connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT * FROM productos');
        
        // Si no hay productos
        if (rows.length === 0) {
            console.log('No se encontraron productos.');
        }

        return rows;
    } catch (error) {
        console.error('Error al obtener los productos:', error.message);
        throw new Error('No se pudo obtener los productos');
    } finally {
        // Cerrar la conexión en caso de que haya un error o no
        if (connection) {
            connection.end();
        }
    }
}

module.exports = { getProducts };
