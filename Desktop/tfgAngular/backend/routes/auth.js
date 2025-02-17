const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Asegúrate de tener el modelo del usuario
const router = express.Router();
const db = require('../config/db'); // Ajusta el path según tu estructura de carpetas
const jwt = require('jsonwebtoken');


// Ruta de login
router.post('/login', (req, res) => {
    console.log('Solicitud de login recibida');
    const { email, password } = req.body;
    console.log('Datos recibidos en login:', req.body);  // Agrega un console.log aquí para ver los datos

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

        // He intentado poner un try Catch antes pero no recoge nada
        try {
            if (results && results.length === 0) {
                // El array está vacío
                console.log('No se encontraron resultados');
            }
        } catch (error) {
            console.error('Error al verificar los resultados:', error);
        }
        

        // Si no se encuentra ningún usuario con ese email
        if (results.length === 0) {
            console.log('El email no está registrado en la base de datos:', email);  // Aquí haces el console.log
            return res.status(400).json({ message: 'No encontramos una cuenta asociada con este correo.' });
        }

        // Si el usuario existe, mostramos los datos encontrados
        const user = results[0];
        console.log('Usuario encontrado en la base de datos:', user);  // Aquí haces el console.log para ver el usuario


        /* Si no se encuentra el usuario
        if (results.length === 0) {
            return res.status(400).json({ message: 'Email no registrado' });
        }

        const user = results[0]; // Asumimos que el primer resultado es el usuario correcto*/

        // Verificar la contraseña
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error al comparar las contraseñas:', err);
                return res.status(500).json({ message: 'Error en la autenticación' });
            }

            // Depuración: Imprime la contraseña cifrada en la base de datos y la proporcionada
            console.log('Contraseña cifrada en la base de datos:', user.password); // Contraseña almacenada en la base de datos (cifrada)
            console.log('Contraseña proporcionada:', password); // Contraseña proporcionada por el usuario (en texto claro)


            if (!isMatch) {
                console.log('La contraseña no coincide');
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            // Contraseña correcta, podemos crear un JWT
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log('Token generado:', token);
            // Redirigir al frontend a marcas.html si la autenticación es exitosa
            return res.status(200).json({
                message: 'Inicio de sesión exitoso',
                token: token // El token también se puede enviar al cliente (por ejemplo, en los headers)
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