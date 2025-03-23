import { Component } from '@angular/core';
// Importación de "FormsModule" para usar ngModel
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,  // Importante para Standalone Components
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html', // 👈 Ahora usa el archivo separado
  styleUrls: ['./login.component.css'] // 👈 Agrega estilos si los tienes

})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  telefono: string = '';
  //telefono: any;

  // Agregamos Router para poder hacer la redirección después del login
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Guardamos el token en localStorage para que se mantenga la sesión
        localStorage.setItem('token', response.token);  // 🔹 Guardar token en localStorage
        this.router.navigate(['/marcas']);
      },
      // Si la autenticación falla
      (error) => {
        this.message = error.error.message;
      }
    );
  }
}
