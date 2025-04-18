import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/product.model';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private apiUrl = 'http://localhost:3000/api/productos';

    constructor(private http: HttpClient) {}

    getProductos(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);  // Cambiar aquí
    }
    
}