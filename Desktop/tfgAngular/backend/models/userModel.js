

const db = require('../config/db');

// Función para encontrar un usuario por su email
function findByEmail(email, callback) {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], callback);
}

// Función para crear un nuevo usuario
function createUser(user, callback) {
    const query = 'INSERT INTO usuarios (email, password) VALUES (?, ?, ?)';
    db.query(query, [user.email, user.password], callback);
}

module.exports = {
    findByEmail,
    createUser,
};



/*const User = {
    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        console.log('Consultando por email:', email);  // Verifica que el email esté llegando correctamente al modelo


        // Agregar log para verificar el email que se pasa
        console.log('Consultando email:', email);

        db.query(sql, [email], (err, results) => {
            // Verificar si hay un error en la consulta
            if (err) {
                console.error('Error en la consulta:', err);
                callback(err, null);
            } else {
                // Mostrar el resultado de la consulta
                console.log('Resultados de la consulta:', results);
                callback(null, results);
            }
        });
    }
};

module.exports = User;*/