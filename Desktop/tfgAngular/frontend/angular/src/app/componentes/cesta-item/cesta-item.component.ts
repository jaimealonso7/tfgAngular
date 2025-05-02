import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarritoServicio } from '../../servicios/carrito.servicio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cesta-item',
  imports: [CommonModule],
  templateUrl: './cesta-item.component.html',
  styleUrl: './cesta-item.component.css'
})
export class CestaItemComponent {
  cartItems: any[] = [];

  @Input() producto: any;
  @Output() eliminar = new EventEmitter<any>();
  constructor(private carritoServicio: CarritoServicio, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartItems = this.carritoServicio.getCartItems();
    console.log('Carrito recibido:', this.cartItems);
  }

  onEliminar() {
    this.eliminar.emit(this.producto);
  }

  sumarCantidad(producto: any) {
    producto.cantidad += 1;
    // Aquí también podrías hacer una llamada al backend para actualizar la cantidad en la base de datos si es necesario.
    this.carritoServicio.actualizarCarritoEnBackend(producto);
  }
  
  restarCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
      this.carritoServicio.actualizarCarritoEnBackend(producto);
    }
  }
  
  // Función para actualizar el carrito en el backend
  actualizarCarritoEnBackend(producto: any) {
    // Aquí va la lógica para actualizar el carrito en la base de datos o hacer una petición HTTP
    this.http.put(`/api/carrito/${producto.idCarrito}`, producto)
      .subscribe(response => {
        console.log('Carrito actualizado:', response);
      });
  }
  

  removeFromCart(producto: any): void {
    this.carritoServicio.removeFromCart(producto);
    console.log('Elimando el producto del carrito:', producto);
  }
  

}
