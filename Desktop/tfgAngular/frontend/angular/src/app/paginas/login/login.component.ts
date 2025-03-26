import { Component, OnInit } from '@angular/core';
// Importación de "FormsModule" para usar ngModel
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

declare var google: any;  // Solo la nueva API de Google Identity

@Component({
  selector: 'app-login',
  standalone: true,  // Importante para Standalone Components
  imports: [CommonModule, FormsModule, HttpClientModule, MatSnackBarModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './login.component.html', // 👈 Ahora usa el archivo separado
  styleUrls: ['./login.component.css'] // 👈 Agrega estilos si los tienes

})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  message: string = '';
  telefono: string = '';
  isError: boolean = false;
  rememberMe: any;
  //telefono: any;

  
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Asegúrate de que Google API está cargado correctamente
    this.loadGoogleApi();
  }

  // Función para cargar la API de Google
  loadGoogleApi(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Una vez que la API esté cargada, inicializa el login de Google
      this.initGoogleLogin();
    };
    document.head.appendChild(script);
  }

  // Función para inicializar el login con Google utilizando la nueva API de Google Identity
  initGoogleLogin(): void {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: '978844024580-h06vs2rcd0rdab84t5caat1lag6lgk5i.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
      });

      // Renderiza el botón de inicio de sesión de Google
      google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' }
      );
    } else {
      console.error('Google API no está disponible.');
    }
  }

  // Función para manejar la respuesta de Google después del login
  handleCredentialResponse(response: any): void {
    const idToken = response.credential;  // ID Token de Google
    console.log('ID Token de Google: ', idToken);
    localStorage.setItem('google_id_token', idToken);
    this.router.navigate(['/marcas']);
  }

  /* Función para manejar el click en el botón de Google Sign-In
  attachSignin(element: any): void {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const idToken = googleUser.getAuthResponse().id_token;
        localStorage.setItem('google_id_token', idToken);
        console.log('ID Token de Google: ', idToken);
        this.router.navigate(['/marcas']);
      },
      (error: any) => {
        console.log('Error en el login con Google: ', error);
      }
    );
  }*/

  onLoginSubmit() {
    console.log('Datos del formulario:', { email: this.email, password: this.password });  // Verificar qué datos se envían

    if (!this.email || !this.password) {
      this.showMessage('⚠️ Email y contraseña son requeridos', true);
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Respuesta del backend:', response); 
        localStorage.setItem('token', response.token);
        this.showMessage('✅ Inicio de sesión exitoso', false);

        setTimeout(() => {
          this.router.navigate(['/marcas']);
        }, 1000);
      },
      (error) => {
        console.error('Error en el login:', error); 
        console.log('Cuerpo del error:', error.error);

        if(error.status === 400) {
          if(error.error?.message === 'Correo no registrado') {
            this.showMessage('❌ El correo no está registrado', true);
          } else if(error.error?.message === 'Contraseña incorrecta') {
            this.showMessage('❌ Contraseña incorrecta', true);
          } else{
            this.showMessage('❌ Correo no registrado', true);
          }
        } 
      }
    );
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }

  onRememberPassword() {
    if (this.rememberMe) {
      // Guardamos el email y la contraseña en localStorage
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
    } else {
      // Si el usuario desmarca el checkbox, eliminamos los datos
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  }

  showMessage(message: string, isError: boolean) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 6000, // 3 segundos
      verticalPosition: 'top', // Posición vertical (arriba o abajo)
      horizontalPosition: 'center', // Posición horizontal (izquierda, centro o derecha)
      panelClass: isError ? 'snackbar-error' : 'snackbar-success' // Estilos personalizados
    });
  }

  onJoinWaitlist() {
    // Aquí iría la lógica de enviar el teléfono para la lista de espera (si es necesario)
    console.log('Enviado a lista de espera con teléfono:', this.telefono);
    // Puedes agregar lógica para enviar datos al servidor, etc.
  }
}
