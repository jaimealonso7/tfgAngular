import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritoServicio {
  private apiUrl = 'http://localhost:3000/api/favoritos';
  private favoritosItems: any[] = [];
  private favoritosSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {
    const idUsuario = this.authService.getUserId();
    if (idUsuario) {
      this.cargarFavoritosDesdeBD(idUsuario);
    } else {
      const storedFavoritos = localStorage.getItem('favoritos');
      if (storedFavoritos) {
        this.favoritosItems = JSON.parse(storedFavoritos);
        this.favoritosSubject.next(this.favoritosItems);
      }
    }
  }

  private saveFavoritos() {
    localStorage.setItem('favoritos', JSON.stringify(this.favoritosItems));
    this.favoritosSubject.next(this.favoritosItems);
  }

  private cargarFavoritosDesdeBD(idUsuario: number) {
    this.http.get<any[]>(`${this.apiUrl}/${idUsuario}`).subscribe({
      next: (favoritos) => {
        this.favoritosItems = favoritos;
        this.saveFavoritos();
      },
      error: (err) => console.error('Error al cargar favoritos desde BD:', err)
    });
  }

  getFavoritosItems(): any[] {
    return this.favoritosItems;
  }

  getFavoritosObservable() {
    return this.favoritosSubject.asObservable();
  }

  agregarAFavoritos(producto: any) {
    const existe = this.favoritosItems.find(
      item => item.idProducto === producto.idProducto
    );

    if (!existe) {
      const idUsuario = this.authService.getUserId();
      console.log('🧾 ID del usuario autenticado:', idUsuario);
      if (idUsuario) {
        this.http.post(this.apiUrl, {
          idUsuario,
          idProducto: producto.idProducto
        }).subscribe({
          next: () => {
            console.log('✅ Producto guardado en la base de datos');
            this.cargarFavoritosDesdeBD(idUsuario); // Refrescar la lista
          },
          error: (error) => console.error('Error al guardar en la base de datos', error)
        });
      } else {
        // Usuario no autenticado, usar localStorage
        const item = { ...producto, cantidad: 1 };
        this.favoritosItems.push(item);
        this.saveFavoritos();
        console.log('Producto guardado en localStorage');
      }
    }
  }

  removeFromFavoritos(producto: any) {
    const idUsuario = this.authService.getUserId();
    if (idUsuario) {
      this.http.delete(this.apiUrl, {
        body: {
          idUsuario,
          idProducto: producto.idProducto
        }
      }).subscribe({
        next: () => {
          console.log('✅ Producto eliminado de la base de datos');
          this.cargarFavoritosDesdeBD(idUsuario); // Refrescar la lista
        },
        error: (error) => console.error('Error al eliminar de la base de datos', error)
      });
    } else {
      // Usuario no autenticado
      this.favoritosItems = this.favoritosItems.filter(item => item.id !== producto.id);
      this.saveFavoritos();
    }
  }

  cleanFavoritos() {
    this.favoritosItems = [];
    this.saveFavoritos();
  }
}
