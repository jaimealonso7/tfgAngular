import { Component, Input } from '@angular/core';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { ImagenesHoverComponent } from "../imagenes-hover/imagenes-hover.component";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormsModule, CommonModule, ImagenesHoverComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: any 

  productImageStyle = {
    border: '1px solid black',
    filter: 'sepia(0.3)'
  }

  formState = false

  address = ''
  postalCode = 0

  buyProduct() {
    console.log('compraremos un producto');
    this.formState = true
  }

  orderProduct() {
    console.log(`Direccion de usuario: ${this.address}`);
    console.log(`Codigo postal: ${this.postalCode}`);
    
  }

  addToCart() {
    console.log('agregaremos un producto al carro de compras');
  }

  onMouseEnter() {
    console.log('mouse enter');
    this.productImageStyle = {...this.productImageStyle, filter: 'sepia(0.3)'}
  }

  onMouseLeave() {
    console.log('mouse leave');
    this.productImageStyle = {...this.productImageStyle, filter: 'sepia(0)'}
    
  }

}
