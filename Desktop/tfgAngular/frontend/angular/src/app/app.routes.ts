import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { MarcasComponent } from './paginas/marcas/marcas.component';
import { StoneComponent } from './paginas/stone/stone.component';
import { CorteizComponent } from './paginas/corteiz/corteiz.component';  // Asegúrate de importar el componente
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { ResultadosBuscadorComponent } from './componentes/resultados-buscador/resultados-buscador.component';
import { FavoritosComponent } from './paginas/favoritos/favoritos.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { DiorComponent } from './paginas/dior/dior.component';
import { VersaceComponent } from './paginas/versace/versace.component';
import { LvComponent } from './paginas/lv/lv.component';
import { MonclerComponent } from './paginas/moncler/moncler.component';
import { CanadaComponent } from './paginas/canada/canada.component';
import { GucciComponent } from './paginas/gucci/gucci.component';
import { ProductosPorCategoriaComponent } from './paginas/productos-por-categoria/productos-por-categoria.component';

export const routes: Routes = [
    { path: '', redirectTo: 'marcas', pathMatch: 'full' },
    { path: 'buscar/:query', component: ResultadosBuscadorComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'marcas', component: MarcasComponent },
    { path: 'stone-island', component: StoneComponent },  // Ruta con nombre normalizado
    { path: 'corteiz', component: CorteizComponent },
    { path: 'lv', component: LvComponent },
    { path: 'dior', component: DiorComponent },
    { path: 'moncler', component: MonclerComponent },
    { path: 'versace', component: VersaceComponent },
    { path: 'canada', component: CanadaComponent },
    { path: 'gucci', component: GucciComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'favoritos', component: FavoritosComponent },
    { path: 'productos/:id', component: ProductosComponent },
    { path: 'categoria/:categoria', component: ProductosPorCategoriaComponent },

    {
      path: 'productos',
      loadComponent: () => import('./paginas/marcas/marcas.component').then(m => m.MarcasComponent)
    }
  ];
  
