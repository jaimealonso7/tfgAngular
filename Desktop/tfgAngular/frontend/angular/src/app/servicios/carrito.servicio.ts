import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CarritoServicio {
  
  private cartItems: any[] = [];

  addToCart(product: any, talla: string) {
    const item = { ...product, tallaSeleccionada: talla };
    this.cartItems.push(item);
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }

  
  
}