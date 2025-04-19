import { Component } from '@angular/core';
import { HeaderComponent } from '../../componentes/header/header.component';
import { ProductCardComponent } from "../../componentes/product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { CarritoServicio } from '../../servicios/carrito.servicio';
import { FormsModule } from '@angular/forms';
import { CestaItemComponent } from "../../componentes/cesta-item/cesta-item.component";

@Component({
  selector: 'app-carrito',
  imports: [HeaderComponent, CommonModule, FormsModule, CestaItemComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  cartItems: any[] = []; // Aquí almacenamos los productos que obtendremos
  subtotal: number = 0;
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
  
  ngOnInit(): void {
    this.carritoServicio.getCartObservable().subscribe(items => {
      this.cartItems = items;
      this.cargarSubtotal();  
    });
  }
  
  get hayProductos(): boolean {
    return this.cartItems.length > 0;
  }
  

  cargarSubtotal() {
    this.subtotal = this.carritoServicio.getSubtotal();
  }
  

  onRemoveItem(product: any): void {
    this.carritoServicio.removeFromCart(product);
  }

  onClearCart(): void {
    this.carritoServicio.clearCart();
  }

}
