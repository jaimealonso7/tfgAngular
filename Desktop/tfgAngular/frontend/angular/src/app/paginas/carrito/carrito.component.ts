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

  eliminarProducto(productoEliminado: any): void {
  // Eliminar del array local para que la vista se actualice
  this.cartItems = this.cartItems.filter(item => item.idCarrito !== productoEliminado.idCarrito);

  // Eliminar del carrito del servicio (y posiblemente del backend)
  this.carritoServicio.removeFromCart(productoEliminado);

  // Recalcular subtotal si es necesario
  this.cargarSubtotal();
}



  constructor(private carritoServicio: CarritoServicio, private authService: AuthService) {}
  
  ngOnInit(): void {
  const idUsuario = this.authService.getUserId();
  console.log('ID del usuario:', idUsuario);

  if (idUsuario) {
    // Usuario autenticado → cargar del backend
    this.carritoServicio.getCartFromBackend(idUsuario).subscribe({
      next: (items) => {
        this.cartItems = this.formatearItems(items);
        this.mostrarMensajeSinProductos = this.cartItems.length === 0;
        this.cargarSubtotal();
      },
      error: (err) => {
        console.error('❌ Error al cargar el carrito desde el backend:', err);
      }
    });
  } else {
    // Usuario invitado → cargar desde localStorage
    const itemsLocales = this.carritoServicio.getCart();
    console.log('🛒 Cargando productos del carrito local:', itemsLocales);
    this.cartItems = this.formatearItems(itemsLocales);
    this.mostrarMensajeSinProductos = this.cartItems.length === 0;
    this.cargarSubtotal();
  }
}

  private formatearItems(items: any[]): any[] {
  return items.map(item => ({
    ...item,
    image: item.image || item.imagen,
    name: item.name || item.nombre,
    color: item.color,
    talla: item.talla,
    description: item.description || item.descripcion
  }));
}


  
  
  
  
  get hayProductos(): boolean {
    return this.cartItems.length > 0;
  }
  

  /*cargarSubtotal() {
    this.subtotal = this.carritoServicio.getSubtotal();
  }*/
  
  cargarSubtotal() {
  this.subtotal = this.cartItems.reduce((total, item) => {
    return total + (item.price * item.cantidad);
  }, 0);
}


  onRemoveItem(product: any): void {
    this.carritoServicio.removeFromCart(product);
  }

  onClearCart(): void {
    this.carritoServicio.clearCart();
  }

}
