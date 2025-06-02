import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../servicios/product.service';
import { CommonModule } from '@angular/common';
import { Producto } from '../../modelos/product.model';
import { HeaderComponent } from "../../componentes/header/header.component";

@Component({
  selector: 'app-productos-por-categoria',
  templateUrl: './productos-por-categoria.component.html',
  styleUrls: ['./productos-por-categoria.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent]
})
export class ProductosPorCategoriaComponent implements OnInit {
  productos: Producto[] = [];
  categoria: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService  // Inyecta el servicio
  ) {}

  ngOnInit(): void {
    // Si quieres leer la categoría desde la URL, puedes usar ActivatedRoute
    this.categoria = this.route.snapshot.paramMap.get('categoria') || 'reloj';

    this.productService.obtenerProductosPorCategoria(this.categoria).subscribe({
      next: productos => {
        this.productos = productos;
      },
      error: err => {
        console.error('Error cargando productos:', err);
      }
    });
  }

  get categoriaPlural(): string {
    const irregularPlurals: { [key: string]: string } = {
      'reloj': 'relojes',
      // puedes añadir más excepciones aquí
    };
  
    const cat = this.categoria.toLowerCase();
  
    const plural = irregularPlurals[cat] || (cat.endsWith('s') ? cat : cat + 's');
    return plural.toUpperCase();
  }
  
}
