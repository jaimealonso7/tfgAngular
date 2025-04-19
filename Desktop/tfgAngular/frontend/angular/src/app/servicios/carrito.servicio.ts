import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CarritoServicio {
  
  private cartItems: any[] = [];
  private cartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart).map((item: any) => ({
        ...item,
        cantidad: item.cantidad ?? 1  // si no existe, ponle 1
      }));
      this.cartSubject.next(this.cartItems);
    }
  }
  

  addToCart(product: any, talla: string) {
    const existente = this.cartItems.find(
      item => item.id === product.id && item.tallaSeleccionada === talla
    );
  
    if (existente) {
      existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
      const item = { 
        ...product, 
        tallaSeleccionada: talla, 
        cantidad: 1 // 👈 aquí te aseguras de que se inicialice correctamente
      };
      this.cartItems.push(item);
    }
  
    this.saveCart();
  }
  

  removeFromCart(productToRemove: any) {
    this.cartItems = this.cartItems.filter(product => product !== productToRemove);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  sumarCantidad(producto: any) {
    producto.cantidad++;
    this.saveCart();
  }

  restarCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.saveCart();
    } else if(producto.cantidad === 1) {
      this.removeFromCart(producto);
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems); // notifica a los subscriptores
  }

  
  
}