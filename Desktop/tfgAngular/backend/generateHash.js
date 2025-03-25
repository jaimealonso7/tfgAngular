const bcrypt = require('bcryptjs');

// Contraseña que deseas cifrar
const password = 'jaime51';

// Genera el hash de la contraseña con un salt de 10
bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Error al cifrar la contraseña', err);
    } else {
        console.log('Contraseña cifrada:', hashedPassword);  // Deberías ver un hash largo aquí, de 60 caracteres
    }
});
