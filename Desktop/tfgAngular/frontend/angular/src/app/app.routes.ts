import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { MarcasComponent } from './paginas/marcas/marcas.component';
import { StoneComponent } from './paginas/stone/stone.component';
import { CorteizComponent } from './paginas/corteiz/corteiz.component';  // Asegúrate de importar el componente
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { ResultadosBuscadorComponent } from './componentes/resultados-buscador/resultados-buscador.component';
import { MarcaDetalleComponent } from './componentes/marca-detalle/marca-detalle.component';
import { FavoritosComponent } from './paginas/favoritos/favoritos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'marcas', pathMatch: 'full' },
    { path: 'buscar/:query', component: ResultadosBuscadorComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'marcas', component: MarcasComponent },
    { path: 'stone-island', component: StoneComponent },  // Ruta con nombre normalizado
    { path: 'corteiz', component: CorteizComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'favoritos', component: FavoritosComponent },
    { path: 'marca/:id', component: MarcaDetalleComponent },
  ];
  
