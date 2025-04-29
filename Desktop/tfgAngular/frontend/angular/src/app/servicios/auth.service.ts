import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../modelos/decodedToken.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  // Registro
  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  // Login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Guardar token
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  // Guardar usuario
  saveUser(user: any): void {
    if (user && typeof user === 'object' && user.id) {
      localStorage.setItem('usuario', JSON.stringify(user));
    } else {
      console.warn('❗ Usuario inválido:', user);
    }
  }

  // Obtener ID de usuario
  getUserId(): number | null {
    const userData = localStorage.getItem('usuario');
    if (!userData || userData === 'undefined') {
      localStorage.removeItem('usuario');
      return null;
    }

    try {
      const user = JSON.parse(userData);
      return user?.id ?? null;
    } catch (e) {
      console.error('Error al parsear usuario:', e);
      localStorage.removeItem('usuario');
      return null;
    }
  }

  // Obtener expiración del token (en milisegundos)
  getTokenExpiration(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.exp * 1000; // exp viene en segundos
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return null;
    }
  }

  // Tiempo restante de sesión en milisegundos
  getRemainingSessionTime(): number | null {
    const expiration = this.getTokenExpiration();
    if (!expiration) return null;
    return expiration - Date.now();
  }

  // Verificar si la sesión expiró
  isSessionExpired(): boolean {
    const remaining = this.getRemainingSessionTime();
    return !remaining || remaining <= 0;
  }
}
