import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Product } from '../../modelos/product.model';
import { products } from '../../paginas/stone/stone.component';

@Component({
  selector: 'app-resultados-buscador',
  imports: [],
  templateUrl: './resultados-buscador.component.html',
  styleUrl: './resultados-buscador.component.css'
})

export class ResultadosBuscadorComponent {
  query: string = '';
  products: Product[] = products;
  resultados: Product[] = []; 

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.query = params['query']; 
      console.log(this.query); 
      this.redirigirSegunBusqueda();
    });
  }
  
  /*redirigirSegunBusqueda() {
    const queryLower = this.query.toLowerCase();

    if (queryLower.includes('stone island accesorios')) {
      this.router.navigate(['/stone'], { queryParams: { category: 'Accesorio' } });
    } else if (queryLower.includes('jerseys') || queryLower.includes('jersey') || queryLower.includes('sudadera') || queryLower.includes('sudaderas')) {
      this.router.navigate(['/stone'], { queryParams: { category: 'Jersey'}})
    } else if (queryLower.includes('pantalones') || queryLower.includes('pantalon')) {
      this.router.navigate(['/stone'], { queryParams: { category: 'Pantalon'}});
    } else if(queryLower.includes('chaquetas')) {
      this.router.navigate(['/stone'], { queryParams: { category: 'Chaqueta'}})
    } else if (queryLower.includes('camisetas')) {
      this.router.navigate(['/stone'], { queryParams: { category: 'Camiseta'}});
    } else if(queryLower.includes('accesorios') || queryLower.includes('accesorio') || queryLower.includes('gorra')){
      this.router.navigate(['/stone'], { queryParams: { category: 'Accesorio'}})
    }
    
    else {
      this.buscarResultados(); // Solo busca resultados si no es una redirección específica
    }
  }*/

    redirigirSegunBusqueda() {
      const queryLower = this.query.toLowerCase();
  
      // Diccionario de palabras clave y sus rutas/categorías asociadas
      const searchMap: { [key: string]: any } = {
          'stone island accesorios': { route: '/stone', params: { category: 'Accesorio' } },
          'jersey': { route: '/stone', params: { category: 'Jersey' } },
          'jerseys': { route: '/stone', params: { category: 'Jersey' } },
          'sudadera': { route: '/stone', params: { category: 'Jersey' } },
          'sudaderas': { route: '/stone', params: { category: 'Jersey' } },
          'pantalon': { route: '/stone', params: { category: 'Pantalon' } },
          'pantalones': { route: '/stone', params: { category: 'Pantalon' } },
          'chaqueta': { route: '/stone', params: { category: 'Chaqueta' } },
          'chaquetas': { route: '/stone', params: { category: 'Chaqueta' } },
          'camiseta': { route: '/stone', params: { category: 'Camiseta' } },
          'camisetas': { route: '/stone', params: { category: 'Camiseta' } },
          'accesorio': { route: '/stone', params: { category: 'Accesorio' } },
          'accesorios': { route: '/stone', params: { category: 'Accesorio' } },
          'gorra': { route: '/stone', params: { category: 'Accesorio' } },
          'marcas': { route: '/marcas', params: { category: 'Volver'}},
          'carrito': { route: '/carrito', params: {} },  // Redirigir al carrito
          'checkout': { route: '/checkout', params: {} }  // Redirigir a checkout
      };
  
      // Buscar si alguna palabra clave coincide
      for (const key in searchMap) {
          if (queryLower.includes(key)) {
              this.router.navigate([searchMap[key].route], { queryParams: searchMap[key].params });
              return;
          }
      }
  
      // Si no encuentra una coincidencia, realiza la búsqueda normal
      this.buscarResultados();
  }
  

  buscarResultados() {
    this.resultados = this.products.filter(producto =>
      producto.name.toLowerCase().includes(this.query.toLowerCase()) ||
      (producto.category && producto.category.toLowerCase().includes(this.query.toLowerCase()))
    );
  }


}
