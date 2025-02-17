


document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita que el formulario se envíe de forma tradicional

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Enviar la solicitud de registro al servidor
    fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Asegúrate de enviar los datos como JSON
        },
        body: JSON.stringify({ email, password })  // Convierte los datos a JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Registro exitoso:', data); // Aquí puedes ver el mensaje de éxito
        alert('Registro exitoso');
        window.location.href = 'marcas.html';  // Redirige a la página de marcas
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    });
});



/*document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos el formulario y el contenedor para mensajes
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');

    // Añadimos un evento submit al formulario
    registerForm.addEventListener('submit', async (e) => {
        // Prevenir el envío tradicional del formulario
        e.preventDefault();

        // Capturar los valores del formulario
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validar campos básicos
        if (!email || !password) {
            messageDiv.textContent = 'Por favor, complete todos los campos.';
            return;
        }

        // Mostrar en consola los datos capturados (para depuración)
        console.log('Email capturado:', email);
        console.log('Contraseña capturada:', password);

        try {
            // Realizar la solicitud al servidor (backend)
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST', // Enviar solicitud POST
                headers: {
                    'Content-Type': 'application/json', // Indicar tipo de contenido
                },
                body: JSON.stringify({ email, password }), // Enviar los datos del formulario en formato JSON
            });

            // Procesar la respuesta del servidor
            const data = await response.json();

            // Mostrar en consola la respuesta del backend (para depuración)
            console.log('Respuesta del servidor:', data);

            if (response.ok) {
                // Registro exitoso, redirigir al usuario
                window.location.href = data.redirectUrl || 'marcas.html';
            } else {
                // Mostrar mensaje de error del backend
                messageDiv.textContent = data.message || 'Error al registrarse.';
            }
        } catch (error) {
            // Mostrar error de conexión
            messageDiv.textContent = 'Error al conectar con el servidor.';
            console.error('Error al registrar:', error);
        }
    });
});*/




/*document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita que el formulario se envíe de forma tradicional

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Enviar la solicitud de registro al servidor
    fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Asegúrate de enviar los datos como JSON
        },
        body: JSON.stringify({ username, password })  // Convierte los datos a JSON
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.error || 'Error desconocido');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Registro exitoso:', data); // Aquí puedes ver el mensaje de éxito
        alert('Registro exitoso');
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    });
});*/