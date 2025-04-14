const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../config/db'); 
const jwt = require('jsonwebtoken');


// Ruta de login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
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

            if (!isMatch) {
                console.log('La contraseña no coincide');
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            // Si las contraseñas coinciden, generamos un JWT
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log('Token generado:', token);

            return res.status(200).json({message: 'Inicio de sesión exitoso', token: token});
        });
    });
});





router.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    db.query('SELECT email FROM usuarios WHERE email = ?', [email], (err, results) => {
        if(err) {
            console.error('Error al verificar el usuario:', err);
            return res.status(500).json({message: 'Error en la base de datos'});
        }

        if(results.length > 0){
            return res.status(400).json({message: 'El email ya esta registrado'});
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error al encriptar la contraseña:', err);
                return res.status(500).json({ message: 'Error al encriptar la contraseña' });
            }
            // Inserta el nuevo usuario en la base de datos
            db.query('INSERT INTO usuarios (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
                    if (err) {
                        console.error('Error en la inserción en la base de datos:', err);
                        return res.status(500).json({ message: 'Error al registrar el usuario' });
                    }
    
                    console.log('Usuario registrado exitosamente', result);
                    res.status(201).json({ message: 'Usuario registrado con éxito' });
                }
            );
        });
    })
});

module.exports = router;