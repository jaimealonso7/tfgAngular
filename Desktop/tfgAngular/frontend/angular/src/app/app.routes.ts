





import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { MarcasComponent } from './paginas/marcas/marcas.component';
import { StoneComponent } from './paginas/stone/stone.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';

export const routes: Routes = [
    //{ path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '', redirectTo: 'marcas', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent},
    { path: 'marcas', component: MarcasComponent},
    { path: 'stone', component: StoneComponent},
    { path: 'carrito', component: CarritoComponent}

];
