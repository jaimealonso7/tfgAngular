import { Component, Input } from '@angular/core';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoServicio } from '../../servicios/carrito.servicio';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  constructor(private router: Router, private carritoServicio: CarritoServicio) {}

  @Input() product: any 
  tallaNoSeleccionada: boolean = false;

  productImageStyle = {
    //border: '1px solid black',
    filter: 'none'
  }

  formState = false


  buyProduct() {
    console.log('compraremos un producto');
    this.formState = true
  }


  /*addToCart() {
    if (this.selectedSize) {
      console.log(`Producto añadido con talla: ${this.selectedSize}`);
      this.tallaNoSeleccionada = false;
  
      this.carritoServicio.addToCart(this.product, this.selectedSize);
  
      this.router.navigate(['/carrito']);
    } else {
      console.log('Debes seleccionar una talla');
      this.tallaNoSeleccionada = true;
    }
  }*/

    addToCart() {
      if(this.selectedSize) {
        // Pasar el producto completo con la talla seleccionada al carrito
        const productWithSize = { ...this.product, tallaSeleccionada: this.selectedSize };
    
        // Añadir al carrito usando el servicio
        this.carritoServicio.addToCart(productWithSize, this.selectedSize);
        
        this.router.navigate(['/carrito']);
      } else {
        console.log('Debes seleccionar una talla');
        this.tallaNoSeleccionada = true;
      }
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
    this.tallaNoSeleccionada = false; // resetea el error si se selecciona una talla
  }


}
