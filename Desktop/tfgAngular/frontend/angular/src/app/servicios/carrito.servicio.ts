import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from "./auth.service";



@Injectable({
  providedIn: 'root'
})
export class CarritoServicio {
  private apiUrl = 'http://localhost:3000/api/carrito'; // URL de tu API
  
  private cartItems: any[] = [];
  private cartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  

  constructor(private http: HttpClient, private authService: AuthService) {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart).map((item: any) => ({
        ...item,
        cantidad: item.cantidad ?? 1  // si no existe, ponle 1
      }));
      this.cartSubject.next(this.cartItems);
    }
  }

  // ✅ Llamado después del login para sincronizar el carrito al backend
  sincronizarCarritoConBackend(token: string): Observable<any> {
    const cartItems = this.getCartItems();

    // Si no hay productos en el carrito local, no hace falta sincronizar
    if (cartItems.length === 0) {
      return new Observable(observer => {
        observer.complete();
      });
    }

    // Enviar el carrito al backend
    return this.http.post(this.apiUrl, { carrito: cartItems }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap(() => {
        // Sincronización exitosa, puedes eliminar el carrito local si lo prefieres
        console.log('Carrito sincronizado con el backend');
      }),
      catchError(error => {
        console.error('Error al sincronizar el carrito:', error);
        return new Observable(observer => observer.complete());
      })
      

    );
  }

  getIdTallaPorNombre(nombre: 'S' | 'M' | 'L' | 'XL'): number {
    const tallas = {
      'S': 1,
      'M': 2,
      'L': 3,
      'XL': 4
    };
    return tallas[nombre];
  }

  addToCart(product: any, talla: string) {
    const idUsuario = this.authService.getUserId();
  
    const existente = this.cartItems.find(
      item => item.id === product.id && item.tallaSeleccionada === talla
    );
  
    if (existente) {
      existente.cantidad += 1;
    } else {
      const item = {
        ...product,
        tallaSeleccionada: talla,
        cantidad: 1
      };
      this.cartItems.push(item);
    }
  
    // Guardar en localStorage siempre
    this.saveCart();
  
    if (idUsuario) {
      // Solo guardar en backend si el usuario está autenticado
      this.http.post('/api/carrito', {
        idUsuario,
        idProducto: product.id,
        idTalla: this.getIdTallaPorNombre(talla as 'S' | 'M' | 'L' | 'XL'),
        cantidad: 1
      }).subscribe({
        next: () => console.log('✅ Producto guardado en la base de datos'),
        error: (error) => console.error('❌ Error al guardar en la BD', error)
      });
    } else {
      console.log('🛒 Producto guardado en el carrito local (usuario invitado)');
    }
  }
  
  
  

  
  

  removeFromCart(productToRemove: any) {
    this.cartItems = this.cartItems.filter(product => product !== productToRemove);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  sumarCantidad(producto: any) {
    if (producto.cantidad < producto.stock) {
      producto.cantidad++;
    }
    this.saveCart();
  }

  restarCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.saveCart();
    } else {
      this.removeFromCart(producto);
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems); // notifica a los subscriptores
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      const precio = Number(item.price); // 👈 conviértelo a número
      const cantidad = item.cantidad || 1;
      return total + precio * cantidad;
    }, 0);
  }
  

  
  
}