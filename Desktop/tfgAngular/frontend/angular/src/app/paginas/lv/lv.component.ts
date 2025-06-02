import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../componentes/header/header.component";
import { ProductCardComponent } from "../../componentes/product-card/product-card.component";
import { ProductService } from '../../servicios/product.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-lv',
  imports: [HeaderComponent, ProductCardComponent, CommonModule],
  templateUrl: './lv.component.html',
  styleUrl: './lv.component.css'
})
export class LvComponent implements OnInit {
  filteredProducts: any[] = [];  // Aquí almacenamos los productos que obtendremos
    
      constructor(private productService: ProductService) {}
    
      ngOnInit(): void {
        this.productService.getProductos().subscribe(
          (data) => {
            this.filteredProducts = data.filter(p => p.idMarca === 6);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }

}
