import { Component } from '@angular/core';
import { HeaderComponent } from '../../componentes/header/header.component';
import { ProductCardComponent } from "../../componentes/product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { CarritoServicio } from '../../servicios/carrito.servicio';
import { FormsModule } from '@angular/forms';
import { CestaItemComponent } from "../../componentes/cesta-item/cesta-item.component";
import { AuthService } from '../../servicios/auth.service';


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


  constructor(private carritoServicio: CarritoServicio, private authService: AuthService) {}
  
  ngOnInit(): void {
    const idUsuario = this.authService.getUserId();
  
    if (idUsuario) {
      this.carritoServicio.getCartFromBackend(idUsuario).subscribe({
        next: (items) => {
          console.log('🛒 Productos del carrito recibidos desde el backend:', items);
          console.log('🛒 Backend carrito completo:', items);

          this.cartItems = items.map(item => ({
            ...item,
            image: item.image || item.imagen,
            name: item.name || item.nombre,
            color: item.color,          // Suponiendo que 'color' viene desde el backend
            talla: item.talla,          // Suponiendo que 'talla' viene desde el backend
            description: item.description || item.descripcion  // Si 'description' no está presente, usar 'descripcion'
          }));
  
          this.mostrarMensajeSinProductos = this.cartItems.length === 0;
          this.cargarSubtotal();
        },
        error: (err) => {
          console.error('❌ Error al cargar el carrito desde el backend:', err);
        }
      });
    } else {
      console.log('Usuario no autenticado');
      // Aquí puedes manejar la situación si el usuario no está autenticado, como redirigir a la página de login.
    }
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
