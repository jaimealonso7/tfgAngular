import { Component } from '@angular/core';
// Importación de "FormsModule" para usar ngModel
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-registro',
  standalone: true,  // 📌 Importante para Standalone Components
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './registro.component.html', // 👈 Ahora usa el archivo separado
  styleUrls: ['./registro.component.css'] // 👈 Agrega estilos si los tienes
})
export class RegistroComponent {
  email: string = '';
  password: string = '';
  telefono: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para el formulario de "Join Waitlist"
  onJoinWaitlistSubmit() {
    console.log("Telefono:", this.telefono);
    // Aquí puedes enviar el teléfono al backend o hacer algo más
  }

  onRegisterSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Verificar que los valores no estén vacíos
    if (!this.email || !this.password) {
      this.message = 'Email y contraseña son requeridos';
      console.log('Faltan datos');
      return;
    }

    this.authService.register(this.email, this.password).subscribe(
      (response) => {
        console.log('Respuesta del registro:', response);
        // Guardamos el token en localStorage para que se mantenga la sesión
        localStorage.setItem('token', response.token);  // 🔹 Guardar token en localStorage
        this.router.navigate(['/marcas']);
      },
      // Si la autenticación falla
      (error) => {
        console.log('Error en el registro:', error);
        this.message = error.error.message;
      }
    );
  }
}

