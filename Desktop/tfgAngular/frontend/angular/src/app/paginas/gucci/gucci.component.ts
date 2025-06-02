import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../componentes/header/header.component";
import { ProductCardComponent } from "../../componentes/product-card/product-card.component";
import { ProductService } from '../../servicios/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gucci',
  imports: [HeaderComponent, ProductCardComponent, CommonModule],
  templateUrl: './gucci.component.html',
  styleUrl: './gucci.component.css'
})
export class GucciComponent implements OnInit {
  filteredProducts: any[] = [];  // Aquí almacenamos los productos que obtendremos

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductos().subscribe(
      (data) => {
        this.filteredProducts = data.filter(p => p.idMarca === 8); // Cambia el ID según corresponda
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}