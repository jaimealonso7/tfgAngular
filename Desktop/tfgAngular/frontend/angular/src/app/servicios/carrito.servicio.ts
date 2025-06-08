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
      console.log('Producto a guardar:', product);
      this.http.post(this.apiUrl, {
        idUsuario,
        idProducto: product.idProducto,
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

  actualizarCarritoEnBackend(producto: any) {
    if (!producto.idCarrito) {
      console.warn('⚠️ No se encontró idCarrito en el producto:', producto);
      return;
    }
  
    this.http.put(`${this.apiUrl}/${producto.idCarrito}`, {
      cantidad: producto.cantidad
    }).subscribe({
      next: (res) => console.log('✅ Cantidad actualizada en el backend:', res),
      error: (err) => console.error('❌ Error al actualizar la cantidad', err)
    });
  }

  removeFromCart(producto: any) {
    const idUsuario = this.authService.getUserId();
    const idCarrito = producto.idCarrito;
  
    if (idUsuario) {
      const url = `${this.apiUrl}/${idCarrito}`;
      this.http.delete(url, {
        body: {
          idUsuario,
          idProducto: producto.idProducto,
          idTalla: this.getIdTallaPorNombre(producto.tallaSeleccionada as 'S' | 'M' | 'L' | 'XL'),
        }
      }).subscribe({
        next: () => {
          console.log('✅ Producto eliminado de la base de datos');
  
          // 🔥 Eliminar también del array local
          this.cartItems = this.cartItems.filter(item =>
            item.idProducto !== producto.idProducto ||
            item.tallaSeleccionada !== producto.tallaSeleccionada
          );
          this.saveCart();

          // Emitir los cambios a los subscriptores de `cartSubject` para actualizar la UI
          this.cartSubject.next(this.cartItems);  // Notifica a los subscriptores
        },
        error: (error) => console.error('❌ Error al eliminar de la BD', error)
      });
    } else {
      // Usuario no autenticado, elimina solo de la vista local
      this.cartItems = this.cartItems.filter(item =>
        item.idProducto !== producto.idProducto ||
        item.tallaSeleccionada !== producto.tallaSeleccionada
      );
      this.saveCart();

      // Emitir los cambios a los subscriptores de `cartSubject`
      this.cartSubject.next(this.cartItems);  // Notifica a los subscriptores
    }
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

  getCartFromBackend(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/carrito/${idUsuario}`);
  }

  getCart(): any[] {
  const cartData = localStorage.getItem('cart');
  try {
    return cartData ? JSON.parse(cartData) : [];
  } catch (e) {
    console.error('❌ Error al parsear carrito local:', e);
    return [];
  }
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
