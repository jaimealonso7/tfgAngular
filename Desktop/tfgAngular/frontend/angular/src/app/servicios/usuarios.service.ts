import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    
    private apiUrl = 'http://localhost:3000/api/usuarios';

    constructor(private http: HttpClient) {}

    // Método para obtener todos los usuarios
    getUsuarios() {
        return this.http.get(this.apiUrl);
    }       

    // Método para obtener un usuario por ID
    getUsuario(id: string) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }       

    // Método para crear un nuevo usuario
    createUsuario(usuario: any) {
        return this.http.post(this.apiUrl, usuario);
    }               

    // Método para actualizar un usuario
    updateUsuario(id: string, usuario: any) {               
        return this.http.put(`${this.apiUrl}/${id}`, usuario);
    }   

    // Método para eliminar un usuario
    deleteUsuario(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

}
