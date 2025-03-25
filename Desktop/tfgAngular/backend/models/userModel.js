

const db = require('../config/db');

// Función para encontrar un usuario por su email
function findByEmail(email, callback) {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], callback);
}

// Función para crear un nuevo usuario
function createUser(user, callback) {
    const query = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
    db.query(query, [user.email, user.password], callback);
}

module.exports = {findByEmail,createUser};


