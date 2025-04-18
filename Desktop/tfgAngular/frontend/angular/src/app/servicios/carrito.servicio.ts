import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CarritoServicio {
    private apiUrl = 'https://localhost:3000/api/carrito'; // Cambia esto a la URL de tu API
    private cartItems: any[] = []; // Aquí almacenamos los productos que obtendremos

    constructor(private http: HttpClient) {}

    // Método para obtener los productos del carrito
    getCartItems(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }   
}