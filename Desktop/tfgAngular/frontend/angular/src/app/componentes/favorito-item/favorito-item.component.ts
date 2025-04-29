import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FavoritoServicio } from '../../servicios/favorito.servicio'; // Replace with the correct path
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorito-item',
  imports: [CommonModule],
  templateUrl: './favorito-item.component.html',
  styleUrl: './favorito-item.component.css'
})
export class FavoritoItemComponent {

  @Input() producto: any;
  @Output() eliminar = new EventEmitter<any>();
  favoritosItems: any[] = [];
  constructor(private favoritoServicio: FavoritoServicio) {}

  ngOnInit(): void {
    this.favoritosItems = this.favoritoServicio.getFavoritosItems();
    console.log('Favoritos recibidos:', this.favoritosItems);
    
  }

  onEliminar() {
    this.eliminar.emit(this.producto);
  }

  toggleFavorite(producto: any) {
    producto.isFavorite = !producto.isFavorite;
    if (producto.isFavorite) {
      this.favoritoServicio.removeFromFavoritos(producto);
    }
  }


}
