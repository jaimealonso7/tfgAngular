import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../componentes/product-card/product-card.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../servicios/product.service';

@Component({
  selector: 'app-corteiz',
  imports: [HeaderComponent, ProductCardComponent, CommonModule],
  templateUrl: './corteiz.component.html',
  styleUrl: './corteiz.component.css'
})
export class CorteizComponent implements OnInit {
  filteredProducts: any[] = [];  // Aquí almacenamos los productos que obtendremos

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductos().subscribe(
      (data) => {
        this.filteredProducts = data.filter(p => p.idMarca === 2);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  

  /* Método para obtener los productos
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
  }*/
}
