import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../modelos/product.model';
import { ProductService } from '../../servicios/product.service';  // Importa el servicio ProductService

@Component({
  selector: 'app-resultados-buscador',
  templateUrl: './resultados-buscador.component.html',
  styleUrls: ['./resultados-buscador.component.css']
})
export class ResultadosBuscadorComponent implements OnInit {
  query: string = '';  // La cadena de búsqueda que el usuario ingresa
  products: Producto[] = [];  // Lista de productos obtenida del servicio
  resultados: Producto[] = [];  // Resultados filtrados según la búsqueda

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService  // Inyectamos el ProductService
  ) {}

  ngOnInit(): void {
    // Obtenemos la búsqueda de los parámetros de la URL
    this.route.params.subscribe(params => {
      this.query = params['query'];  
      console.log(this.query);  
      this.redirigirSegunBusqueda();  
    });

    // Llamamos al servicio para obtener los productos desde la API
    this.productService.getProductos().subscribe((productos) => {
      this.products = productos;  // Almacenamos los productos en la lista
      this.buscarResultados();  // Ejecutamos la búsqueda una vez los productos están cargados
    });
  }

  normalize(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  // Función que maneja la redirección según la consulta de búsqueda

  
  redirigirSegunBusqueda() {
    const queryLower = this.query.toLowerCase();  // Convertimos la consulta a minúsculas

    // Diccionario de palabras clave y sus rutas/categorías asociadas
    const searchMap: { [key: string]: any } = {
      //STONE ISLAND
      'stone island': { route: '/stone-island', params: { category: 'Volver' } },
      
      // CORTEIZ
      'corteiz': { route: '/corteiz', params: { category: 'Volver' } },
      'corteiz sudadera': { route: '/corteiz', params: { category: 'Sudadera' } },

      // DIOR
      'dior': { route: '/dior', params: { category: 'Volver' } },

      // Versace 
      'versace': { route: '/versace', params: { category: 'Volver' } },

      // LV
      'louis vuitton': { route: '/lv', params: { category: 'Volver' } },

      // MONCLER
      'moncler': { route: '/moncler', params: { category: 'Volver' } },

      // CANADA
      'canada goose': { route: '/canada', params: { category: 'Volver' } },

      // GUCCI
      'gucci': { route: '/gucci', params: { category: 'Volver' } },
      
      // MARCAS
      'marcas': { route: '/marcas', params: { category: 'Volver' } },

      // ROPA
      'jersey': { route: '/categoria/jersey', params: { category: 'Sudadera' } },
      'jerseys': { route: '/categoria/jersey', params: { category: 'Sudadera' } },
      'sudadera': { route: '/categoria/jersey', params: { category: 'Sudadera' } },
      'sudaderas': { route: '/categoria/jersey', params: { category: 'Sudadera' } },
      'pantalón': { route: '/categoria/pantalon', params: { category: 'Pantalón' } },
      'pantalones': { route: '/categoria/pantalon', params: { category: 'Pantalón' } },
      'chaqueta': { route: '/categoria/chaqueta', params: { category: 'Chaqueta' } },
      'chaquetas': { route: '/categoria/chaqueta', params: { category: 'Chaqueta' } },
      'abrigo': { route: '/categoria/chaqueta', params: { category: 'Abrigo' } },
      'abrigos': { route: '/categoria/chaqueta', params: { category: 'Abrigo' } },
      'cortavientos': { route: '/categoria/chaqueta', params: { category: 'Abrigo' } },
      'polo': { route: '/categoria/polo', params: { category: 'Polo' } },
      'polos': { route: '/categoria/polo', params: { category: 'Polo' } },
      'camiseta': { route: '/categoria/camiseta', params: { category: 'Camiseta' } },
      'camisetas': { route: '/categoria/camiseta', params: { category: 'Camiseta' } },

      // ACCESORIOS
      'bolso': { route: '/categoria/bolso', params: { category: 'Bolso' } },
      'bolsos': { route: '/categoria/bolso', params: { category: 'Bolso' } },
      'pulsera': { route: '/categoria/pulsera', params: { category: 'Pulsera' } },
      'pulseras': { route: '/categoria/pulsera', params: { category: 'Pulsera' } },
      'collar': { route: '/categoria/collar', params: { category: 'Collar' } },
      'collares': { route: '/categoria/collar', params: { category: 'Collar' } },
      'pendiente': { route: '/categoria/pendiente', params: { category: 'Pendiente' } },
      'pendientes': { route: '/categoria/pendiente', params: { category: 'Pendiente' } },
      'anillo': { route: '/categoria/anillo', params: { category: 'Anillo' } },
      'anillos': { route: '/categoria/anillo', params: { category: 'Anillo' } },
      'gafas': { route: '/categoria/gafas', params: { category: 'Gafas' } },
      'gafa': { route: '/categoria/gafas', params: { category: 'Gafas' } },
      'gafas de sol': { route: '/categoria/gafas', params: { category: 'Gafas' } },
      'gafa de sol': { route: '/categoria/gafas', params: { category: 'Gafas' } },
      'reloj': { route: '/categoria/reloj', params: { category: 'Reloj' } },
      'relojes': { route: '/categoria/reloj', params: { category: 'Reloj' } },
      
      // PERFUMES
      'perfume': { route: '/categoria/perfume', params: { category: 'Perfume' } },
      'perfumes': { route: '/categoria/perfume', params: { category: 'Perfume' } },
      
      // CARRITO Y CHECKOUT
      'carrito': { route: '/carrito', params: {} },  // Redirigir al carrito
      'checkout': { route: '/checkout', params: {} },  // Redirigir a checkout
    };
    // Comprobamos si alguna palabra clave de la búsqueda coincide con el diccionario
    for (const key in searchMap) {
      if (queryLower.includes(key)) {
        // Si se encuentra una coincidencia, redirigimos a la ruta correspondiente
        this.router.navigate([searchMap[key].route], { queryParams: searchMap[key].params });
        return;
      }
    }

    // Si no encontramos coincidencias, realizamos la búsqueda normal
    this.buscarResultados();
  }

 

  // Función que filtra los productos según la consulta de búsqueda
  buscarResultados() {
  const queryNorm = this.normalize(this.query);
  const palabras = queryNorm.split(' ');

  this.resultados = this.products.filter(producto => {
    const texto = this.normalize(`${producto.name} ${producto.category || ''} ${producto.description || ''}`);
    return palabras.every(p => texto.includes(p));
  });

  // ✅ Si no hay resultados, no redirige
  if (this.resultados.length === 0) {
    alert('No se encontraron resultados para tu búsqueda.');
    return;
  }

  // Si hay resultados, puedes redirigir a una página de resultados si hace falta
  this.router.navigate(['/resultados'], { queryParams: { q: this.query } });
}

}
