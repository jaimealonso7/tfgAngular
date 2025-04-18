import { Component, Input } from '@angular/core';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: any 

  productImageStyle = {
    //border: '1px solid black',
    filter: 'none'
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

  isHovered = false;

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  /*ngOnInit() {
    if (this.product) {
      this.product.sizes = ['S', 'M', 'L', 'XL'];  // se lo agregas tú manualmente
    }
  }*/

   // Puedes acceder a las tallas de esta forma:
  get stockPorTalla() {
    return this.product.stockPorTalla || [];
  } 

  selectedSize: string = '';

onSizeChange(event: any) {
  this.selectedSize = event.target.value;
}


}
