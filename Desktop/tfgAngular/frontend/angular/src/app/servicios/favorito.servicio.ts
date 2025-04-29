import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritoServicio {
  private apiUrl = 'http://localhost:3000/api/favoritos'; // URL de tu API
  private favoritosItems: any[] = []; 
  private favoritosSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); // Subject para emitir cambios en los favoritos

  constructor(private http: HttpClient, private authService: AuthService) {
    const storedFavoritos = localStorage.getItem('favoritos');
    if (storedFavoritos) {
      this.favoritosItems = JSON.parse(storedFavoritos).map((item: any) => ({
        ...item,
        cantidad: item.cantidad ?? 1  // si no existe, ponle 1
      }));
      this.favoritosSubject.next(this.favoritosItems);
    }
   }

  // Método para agregar un producto a favoritos
  agregarAFavoritos(producto: any) {
    const existe = this.favoritosItems.find(
      item => item.idProducto === producto.idProducto
    );
    console.log('Producto que se intenta agregar:', producto);

    if (existe) {
      existe.cantidad += 1; // Incrementa la cantidad si ya existe
    } else {
      const item = {
        ...producto,
        id: producto.idProducto, // Asegúrate de que el ID sea único
        cantidad: 1 // Inicializa la cantidad en 1 si es nuevo
      };
      this.favoritosItems.push(item); // Agrega el nuevo producto al array
      console.log('Favoritos después de agregar:', this.favoritosItems);

    }

    // Guardar en localStorage siempre
    this.saveFavoritos();

    const idUsuario = this.authService.getUserId(); // Obtén el ID del usuario desde el servicio de autenticación

    if (idUsuario) {
      this.http.post('/api/favoritos', {
        idUsuario,
        idProducto: producto.idProducto,
        cantidad: 1 // Puedes ajustar esto según tu lógica
      }).subscribe({
        next: () => { console.log('✅ Producto guardado en la base de datos'); },
        error: (error) => console.error('Error al guardar en la base de datos', error)
      });
    } else {
      console.log(' Producto guardado en localStorage');
    }
  }

  removeFromFavoritos(producto: any) {
    this.favoritosItems = this.favoritosItems.filter(item => item.id !== producto.id);
    this.saveFavoritos(); // Guarda los cambios en localStorage
  }

  cleanFavoritos() {
    this.favoritosItems = [];
    this.saveFavoritos(); // Limpia el carrito y guarda los cambios en localStorage
  }

  getFavoritosItems(): any[] {
    return this.favoritosItems;
  }

  getFavoritosObservable() {
    return this.favoritosSubject.asObservable(); // Devuelve un observable para que otros componentes puedan suscribirse
  }

  private saveFavoritos() {
    console.log('Guardando productos favoritos en localStorage:', this.favoritosItems); // Esto ayuda a depurar si los favoritos se guardan correctamente
    localStorage.setItem('favoritos', JSON.stringify(this.favoritosItems));
    this.favoritosSubject.next(this.favoritosItems); // Notifica a los subscriptores
  }
  


}
