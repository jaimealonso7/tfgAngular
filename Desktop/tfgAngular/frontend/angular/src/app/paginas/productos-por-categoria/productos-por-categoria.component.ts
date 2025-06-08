import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../servicios/product.service';
import { Producto } from '../../modelos/product.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../componentes/header/header.component";
import { switchMap, distinctUntilChanged, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos-por-categoria',
  templateUrl: './productos-por-categoria.component.html',
  styleUrls: ['./productos-por-categoria.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule]
})
export class ProductosPorCategoriaComponent implements OnInit {
  productos: Producto[] = [];
  categoria: string = '';
  ordenSeleccionado = 'relevancia';
  dropdownAbierto = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('categoria') || 'reloj'),
      distinctUntilChanged(), // Solo si el valor cambia
      switchMap((categoria) => {
        this.categoria = categoria;
        this.productos = []; // limpia antes de cargar nuevos
        return this.productService.obtenerProductosPorCategoria(categoria);
      })
    ).subscribe({
      next: productos => this.productos = productos,
      error: err => console.error('Error cargando productos:', err)
    });
  }

toggleDropdown() {
  this.dropdownAbierto = !this.dropdownAbierto;
}

cerrarDropdown() {
  this.dropdownAbierto = false;
}

seleccionarOrden(tipo: string) {
  this.ordenSeleccionado = tipo;
  this.dropdownAbierto = false;

  this.ordenarProductos(); // aplica el orden
}

ordenarProductos() {
  if (this.ordenSeleccionado === 'precioAsc') {
    this.productos.sort((a, b) => Number(a.price) - Number(b.price));
    this.dropdownAbierto = true;
    
  } else if (this.ordenSeleccionado === 'precioDesc') {
    this.productos.sort((a, b) => Number(b.price) - Number(a.price));
    this.dropdownAbierto = true;
  } else {
    // 'relevancia' u otro valor: no hacer nada o restaurar orden original
  }
}



  get categoriaPlural(): string {
    const irregularPlurals: { [key: string]: string } = {
      'reloj': 'relojes',
      'pantalon': 'pantalones',
      'collar': 'collares',
      // otras reglas personalizadas
    };
    const cat = this.categoria.toLowerCase();
    return (irregularPlurals[cat] || (cat.endsWith('s') ? cat : cat + 's')).toUpperCase();
  }
  

}
