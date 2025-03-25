import { Component } from '@angular/core';
// Importación de "FormsModule" para usar ngModel
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,  // Importante para Standalone Components
  imports: [CommonModule, FormsModule, HttpClientModule, MatSnackBarModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './login.component.html', // 👈 Ahora usa el archivo separado
  styleUrls: ['./login.component.css'] // 👈 Agrega estilos si los tienes

})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  telefono: string = '';
  isError: boolean = false;
  rememberMe: any;
  //telefono: any;

  // Agregamos Router para poder hacer la redirección después del login
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

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
