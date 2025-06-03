import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../servicios/product.service';
import { Producto } from '../../modelos/product.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../componentes/header/header.component";
import { switchMap, distinctUntilChanged, map } from 'rxjs/operators';

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
}
