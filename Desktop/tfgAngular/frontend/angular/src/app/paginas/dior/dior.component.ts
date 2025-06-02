import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../componentes/header/header.component";
import { ProductCardComponent } from "../../componentes/product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { ProductService } from '../../servicios/product.service';

@Component({
  selector: 'app-dior',
  imports: [HeaderComponent, ProductCardComponent, CommonModule],
  templateUrl: './dior.component.html',
  styleUrl: './dior.component.css'
})
export class DiorComponent implements OnInit {
  filteredProducts: any[] = [];  // Aquí almacenamos los productos que obtendremos
  
    constructor(private productService: ProductService) {}
  
    ngOnInit(): void {
      this.productService.getProductos().subscribe(
        (data) => {
          this.filteredProducts = data.filter(p => p.idMarca === 3);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }

}
