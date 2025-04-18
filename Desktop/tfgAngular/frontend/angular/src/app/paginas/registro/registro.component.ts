import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// Importación de "FormsModule" para usar ngModel
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registro',
  standalone: true,  
  imports: [CommonModule, FormsModule, HttpClientModule, MatSnackBarModule, MatButtonModule],
  templateUrl: './registro.component.html', 
  styleUrls: ['./registro.component.css'] 
})
export class RegistroComponent{
  email: string = '';
  password: string = '';
  telefono: string = '';
  message: string = '';
  isError: boolean = false;
  rememberMe: any;


  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}
  

  // Método para el formulario de "Join Waitlist"
  onJoinWaitlistSubmit() {
    console.log("Telefono:", this.telefono);
    // Aquí puedes enviar el teléfono al backend o hacer algo más
  }

  onRegisterSubmit() {
    console.log('🔍 Método onRegisterSubmit() ejecutado'); 
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  
    if (!this.email || !this.password) {
      this.showMessage('⚠️ Email y contraseña son requeridos', true);
      return;
    }
  
    this.authService.register(this.email, this.password).subscribe(
      (response) => {
        console.log('✅ Registro exitoso:', response);
        localStorage.setItem('token', response.token);
  
        this.showMessage('✅ Registro exitoso, redirigiendo...', false);
  
        setTimeout(() => {
          this.router.navigate(['/marcas']);
        }, 2000);
      },
      (error) => {
        console.log('❌ Error en el registro:', error);
  
        let errorMessage = '❌ Error en el registro. Inténtalo de nuevo.';
        if (error.status === 400 && error.error.message) {
          errorMessage = error.error.message; // Mensaje del backend
        }
  
        this.showMessage(errorMessage, true);
      }
    );
  }

  showMessage(message: string, isError: boolean) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 6000, // 3 segundos
      verticalPosition: 'top', // Posición vertical (arriba o abajo)
      horizontalPosition: 'center', // Posición horizontal (izquierda, centro o derecha)
      panelClass: isError ? 'snackbar-error' : 'snackbar-success' // Estilos personalizados
    });
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
  
  
  
  
  
}

