const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Asegúrate de tener el modelo del usuario
const router = express.Router();
const db = require('../config/db'); // Ajusta el path según tu estructura de carpetas
const jwt = require('jsonwebtoken');


// Ruta de login
// Ruta de login
router.post('/login', (req, res) => {
    console.log('Datos recibidos en login:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Faltan datos');
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    // Verificar si el usuario existe
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).json({ message: 'Error en la base de datos' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Si el usuario existe, obtenemos sus datos
        const user = results[0];
        console.log('Usuario encontrado en la base de datos:', user);

        // Verificamos si la contraseña proporcionada coincide con el hash
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error al comparar las contraseñas:', err);
                return res.status(500).json({ message: 'Error en la autenticación' });
            }

            // Depuración
            console.log('Contraseña cifrada en la base de datos:', user.password);
            console.log('Contraseña proporcionada:', password);

            if (!isMatch) {
                console.log('La contraseña no coincide');
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            // Si las contraseñas coinciden, generamos un JWT
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log('Token generado:', token);

            return res.status(200).json({
                message: 'Inicio de sesión exitoso',
                token: token
            });
        });
    });
});





router.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Validación de datos
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    // Encriptar la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error al encriptar la contraseña:', err);
            return res.status(500).json({ message: 'Error al encriptar la contraseña' });
        }
        console.log('Contraseña cifrada correctamente:', hashedPassword); // Aquí puedes ver el hash

        // Consulta para insertar el nuevo usuario en la base de datos
        db.query(
            'INSERT INTO usuarios (email, password) VALUES (?, ?)', 
            [email, hashedPassword], 
            (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ message: 'El email ya está registrado' });
                    }
                    console.error('Error en la inserción en la base de datos:', err);
                    return res.status(500).json({ message: 'Error al registrar el usuario' });
                }

                console.log('Usuario registrado exitosamente', result);
                res.status(201).json({ message: 'Usuario registrado con éxito' });
            }
        );
    });

});

// Ruta para registrar nuevos usuarios
/*router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el usuario ya existe
        User.findByEmail(email, async (err, results) => {
            if (err) {
                console.error('Error al verificar usuario:', err);
                return res.status(500).json({ message: 'Error del servidor' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }

            // Cifrar la contraseña
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            // Crear un nuevo usuario en la base de datos
            User.createUser({ email, password: hashedPassword }, (err, result) => {
                if (err) {
                    console.error('Error al registrar usuario:', err);
                    return res.status(500).json({ message: 'Error al registrar usuario' });
                }

                // Respuesta exitosa
                res.status(201).json({ 
                    message: 'Usuario registrado exitosamente',
                    redirectUrl: 'marcas.html' 
                });
            });
        });
    } catch (error) {
        console.error('Error inesperado:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});*/


module.exports = router;