import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../componentes/product-card/product-card.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { ProductService } from '../../servicios/product.service';

@Component({
  selector: 'app-stone',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, HeaderComponent],
  templateUrl: './stone.component.html',
  styleUrl: './stone.component.css'
})
export class StoneComponent implements OnInit {
  filteredProducts: any[] = [];  // Aquí almacenamos los productos que obtendremos

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  // Método para obtener los productos
  getProducts(): void {
    this.productService.getProductos().subscribe(
      (data) => {
        console.log('Productos obtenidos:', data);  // Muestra los productos en consola
        this.filteredProducts = data;  // Asigna los productos a la variable
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
}
