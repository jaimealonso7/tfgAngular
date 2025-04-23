import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  // Hace una petición POST a la URL del backend con el email y password
  // Devuelve un Observable con la respuesta del backend
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUserId(): number | null {
    const userData = localStorage.getItem('usuario');
    if (!userData) return null;
  
    try {
      const user = JSON.parse(userData);
      return user?.id || null;
    } catch (e) {
      console.error('Error al parsear el usuario del localStorage:', e);
      return null;
    }
  }
  
}
