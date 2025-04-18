import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../componentes/header/header.component";
import { ProductCardComponent } from "../../componentes/product-card/product-card.component";

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, HeaderComponent, ProductCardComponent],
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  marcas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/marcas')
      .subscribe({
        next: (data) => {
          this.marcas = data.map(marca => ({
            ...marca,
            // Change this line to generate the correct routes:
            ruta: this.generateRoute(marca.nombre)
          }));
          console.log('Rutas generadas:', this.marcas.map(m => m.ruta));
        },
        error: (error) => {
          console.error('Error al obtener marcas:', error);
        }
      });
  }

  // Replace normalizeUrl with this new method:
  generateRoute(marcaNombre: string): string {
    // Convert to lowercase and replace spaces with hyphens
    const slug = marcaNombre.toLowerCase().replace(/\s+/g, '-');
    
    // Return the route with leading slash
    return `/${slug}`;
    
    // OR if you want specific routes:
    // if (marcaNombre === 'Stone Island') return '/stone';
    // if (marcaNombre === 'Corteiz') return '/corteiz';
    // return '/';
  }
}
