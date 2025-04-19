import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarritoServicio } from '../../servicios/carrito.servicio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cesta-item',
  imports: [CommonModule],
  templateUrl: './cesta-item.component.html',
  styleUrl: './cesta-item.component.css'
})
export class CestaItemComponent {

  @Input() producto: any;
  @Output() eliminar = new EventEmitter<any>();
  cartItems: any[] = [];
  constructor(private carritoServicio: CarritoServicio) {}

  ngOnInit(): void {
    this.cartItems = this.carritoServicio.getCartItems();
    console.log('Carrito recibido:', this.cartItems);
  }

  onEliminar() {
    this.eliminar.emit(this.producto);
  }

  sumarCantidad(producto: any) {
    this.carritoServicio.sumarCantidad(producto);
  }

  restarCantidad(producto: any) {
    this.carritoServicio.restarCantidad(producto);
  }
  

}
