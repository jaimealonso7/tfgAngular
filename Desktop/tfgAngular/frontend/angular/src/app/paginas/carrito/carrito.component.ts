import { Component } from '@angular/core';
import { HeaderComponent } from '../../componentes/header/header.component';
import { ProductCardComponent } from "../../componentes/product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { CarritoServicio } from '../../servicios/carrito.servicio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  imports: [HeaderComponent, ProductCardComponent, CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  cartItems: any[] = []; // Aquí almacenamos los productos que obtendremos
  totalPrice: number = 0; // Aquí almacenamos el precio total de los productos en el carrito
  itemCount: number = 0; // Aquí almacenamos la cantidad de productos en el carrito

  mostrarMensajeSinProductos = false;
  mostrarInput = false;
  codigoPromo: string = '';

  aplicarCodigo() {
    if (!this.cartItems || this.cartItems.length === 0) {
      if (this.codigoPromo.trim()) {
        this.mostrarMensajeSinProductos = true;
      }
      return;
    }
  
    // Si hay productos, oculta el mensaje
    this.mostrarMensajeSinProductos = false;
  
    // Aquí iría la lógica real del código promocional
    console.log('Aplicando código:', this.codigoPromo);
  }


  constructor(private carritoServicio: CarritoServicio) {}
  

}
