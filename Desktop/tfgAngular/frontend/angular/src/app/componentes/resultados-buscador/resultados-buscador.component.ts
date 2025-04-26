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
      this.query = params['query'];  // Almacenamos la consulta de búsqueda
      console.log(this.query);  // Mostrar la consulta en la consola (para debug)
      this.redirigirSegunBusqueda();  // Verificamos si debemos redirigir según la búsqueda
    });

    // Llamamos al servicio para obtener los productos desde la API
    this.productService.getProductos().subscribe((productos) => {
      this.products = productos;  // Almacenamos los productos en la lista
      this.buscarResultados();  // Ejecutamos la búsqueda una vez los productos están cargados
    });
  }

  // Función que maneja la redirección según la consulta de búsqueda
  redirigirSegunBusqueda() {
    const queryLower = this.query.toLowerCase();  // Convertimos la consulta a minúsculas

    // Diccionario de palabras clave y sus rutas/categorías asociadas
    const searchMap: { [key: string]: any } = {
      'stone island accesorios': { route: '/stone', params: { category: 'Accesorio' } },
      'jersey': { route: '/stone-island', params: { category: 'Jersey' } },
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
      'marcas': { route: '/marcas', params: { category: 'Volver' } },
      'carrito': { route: '/carrito', params: {} },  // Redirigir al carrito
      'checkout': { route: '/checkout', params: {} },  // Redirigir a checkout
      'corteiz' : { route: '/corteiz', params: { category: 'Volver' } },
      'corteiz sudadera' : { route: '/corteiz', params: { category: 'Sudadera' } },
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
    this.resultados = this.products.filter(producto =>
      producto.name.toLowerCase().includes(this.query.toLowerCase()) ||  // Compara el nombre del producto
      (producto.category && producto.category.toLowerCase().includes(this.query.toLowerCase()))  // Compara la categoría del producto (si está definida)
    );
  }
}
