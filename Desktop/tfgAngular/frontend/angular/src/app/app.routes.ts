





import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MarcasComponent } from './componentes/marcas/marcas.component';

export const routes: Routes = [
  
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent},
    { path: 'marcas', component: MarcasComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura las rutas principales de la aplicación
  exports: [RouterModule], // Exporta RouterModule para que otros módulos puedan usarlo
})

  export class AppRoutingModule { }