import { Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoServicio } from '../../servicios/carrito.servicio';
import { FavoritoServicio } from '../../servicios/favorito.servicio';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() product: any 
  isFavorite: boolean = false;

  constructor(private router: Router, private carritoServicio: CarritoServicio, private favoritoServicio: FavoritoServicio) {}

  tallaNoSeleccionada: boolean = false;

  productImageStyle = {
    //border: '1px solid black',
    filter: 'none'
  }

  ngOnInit() {
    // Verificamos si el producto ya está en favoritos al cargar el componente
    const favoritos = this.favoritoServicio.getFavoritosItems();
    this.isFavorite = favoritos.some(item => item.idProducto === this.product.idProducto);
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;  // Cambiar el estado del corazón

    if (this.isFavorite) {
      this.favoritoServicio.agregarAFavoritos(this.product);
      console.log('Producto añadido a favoritos');
    } else {
      this.favoritoServicio.removeFromFavoritos(this.product);
      console.log('Producto eliminado de favoritos');
    }
  }

  formState = false


  buyProduct() {
    console.log('compraremos un producto');
    this.formState = true
  }

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

    addToFavorites() {
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite) {
        this.favoritoServicio.agregarAFavoritos(this.product);
        console.log('Producto añadido a favoritos');
      }
      else {
        this.favoritoServicio.removeFromFavoritos(this.product);
        console.log('Producto eliminado de favoritos');
      }
    }

  
    
  

  isHovered = false;

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }
  
  get stockPorTalla() {
    return this.product.stockPorTalla || [];
  } 

  selectedSize: string = '';

  onSizeChange(event: any) {
    this.selectedSize = event.target.value;
    this.tallaNoSeleccionada = false; // resetea el error si se selecciona una talla
  }


}
