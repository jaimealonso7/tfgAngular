import { Component } from '@angular/core';
import { HeaderComponent } from "../../componentes/header/header.component";
import { RouterModule } from '@angular/router';
import { FavoritoItemComponent } from "../../componentes/favorito-item/favorito-item.component";
import { FavoritoServicio } from '../../servicios/favorito.servicio';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-favoritos',
  imports: [HeaderComponent, CommonModule, RouterModule, FavoritoItemComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {
  favoritosItems: any[] = []; // Aquí almacenamos los productos que obtendremos
  mostrarMensajeSinProductos = false; // Variable para mostrar el mensaje de "No hay productos en favoritos"
  mostrarInput = false; // Variable para mostrar el input del código promocional
  usuarioLogueado = false; // Cámbialo a true para probar el estado logueado


  constructor(private favoritoServicio: FavoritoServicio, private router: Router, private authService: AuthService) {} // Inyectamos el servicio de favoritos

  ngOnInit(): void {
    this.usuarioLogueado = this.authService.isLoggedIn();

    this.favoritoServicio.getFavoritosObservable().subscribe(items => {
      console.log('Favoritos cargados:', items); // Aquí puedes ver si los favoritos se cargan al recargar la página
      this.favoritosItems = items.map(item => ({
        ...item,
        image: item.image || item.imagen,
        name: item.name || item.nombre
      }));
      
      this.mostrarMensajeSinProductos = this.favoritosItems.length === 0;
    });
  }
  

  get hayProductos(): boolean {
    return this.favoritosItems.length > 0; // Verificamos si hay productos en favoritos
  }

  onRemoveItem(product: any): void {
    this.favoritoServicio.removeFromFavoritos(product); // Llamamos al método del servicio para eliminar el producto de favoritos
  }

  onClearFavoritos(): void {
    this.favoritoServicio.cleanFavoritos(); // Llamamos al método del servicio para limpiar todos los favoritos
  }  

  goToLogin() {
    this.router.navigate(['/login']); // Cambia '/login' al path correcto en tu app
  }
}
