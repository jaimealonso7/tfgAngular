

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim(); // Elimina los espacios en blanco
    const password = document.getElementById('password').value.trim();

    //alert(`Email capturado: ${email}`); 
    console.log(document.getElementById('email'));
    // Validar que los campos no estén vacíos
    console.log('Valor del email:', email);
    console.log('Valor de la contraseña:', password);
    
    if (!email) {
        console.error('El campo email está vacío o no se capturó.');
    }
    if (!password) {
        console.error('El campo password está vacío o no se capturó.');
    }

    // Enviar solicitud de login
    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        console.log('Respuesta recibida del servidor:', response);
        return response.json();  // Convertir la respuesta a JSON
    })
    .then(data => {
        console.log('Respuesta del servidor (JSON):', data);
        if (data.message === 'Inicio de sesión exitoso') {
            // Redirigir a marcas.html después de un login exitoso
            window.location.href = 'marcas.html'; // Redirige al usuario a la página de marcas
        } else {
            alert(data.message); // Mostrar el mensaje de error
        }
    })
    .catch(error => {
        console.error('Error en el login:', error);
        alert('Hubo un problema al intentar iniciar sesión. Inténtalo de nuevo.');
    });
});



/*
//Escucha cuando se carga el contenido del documento (DOM)
document.addEventListener('DOMContentLoaded', () => {
    //Obtenemos los elementos del formulario y el contenedor de mensajes
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    //Se añade un eventListener al formulario para el evento submit
    loginForm.addEventListener('submit', async (e) => {
        // Evita el envío tradicional del formulario
        e.preventDefault(); 

        // Obtenemos los valores de los campos del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Verificamos que el email y la contraseña no estén vacíos
        if (!email || !password) {
            messageDiv.textContent = 'Por favor, complete todos los campos.';
            return;
        }

        console.log('Formulario enviado');
        console.log('Email capturado:', email);
        console.log('Password capturado:', password);

        //Realizamos la solicitud fetch al servidor (backend)
        try {
            //Realizamos una solicitud HTTP POST al servidor 
            //en la URL para intentar autenticar al usuario.
            const response = await fetch('http://localhost:3000/api/auth/login', {
                //Indica que estamos enviando datos al servidor
                method: 'POST',
                //Establece el cuerpo de la solicitud sera en JSON.
                headers: { 'Content-Type': 'application/json' },
                //En el cuerpo de la solicitud enviamos los datos de login 
                //(correo y contraseña) convertidos en una cadena JSON.
                body: JSON.stringify({ email, password }),
            });

            console.log('Response:', response); // Verifica la respuesta del servidor
            
            //Procesar la respuesta del servidor
            const data = await response.json();

            console.log('Respuesta del servidor:', data); // Verificamos la respuesta del backend

            //Comprobamos si la autenticación fue exitosa o no
            if (response.ok) {
                window.location.href = 'marcas.html';
            } else {
                messageDiv.textContent = data.message || 'Error al iniciar sesión.';
            }
        } catch (error) {
            messageDiv.textContent = 'Error al conectar con el servidor.';
            console.error(error);
        }
    });
});*/