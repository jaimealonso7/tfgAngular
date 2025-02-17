

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // Importar HttpClient
import { provideRouter, Route } from '@angular/router';
import { AppComponent } from './app/app.component';  // Importar AppComponent
import { LoginComponent } from './app/componentes/login/login.component';
import { RegistroComponent } from './app/componentes/registro/registro.component';
import { MarcasComponent } from './app/componentes/marcas/marcas.component';

// Definir las rutas
const routes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirige por defecto a login
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'marcas', component: MarcasComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Proveer las rutas definidas
    provideHttpClient(),    // Habilitar HttpClient para peticiones HTTP
  ]
})
  .catch((err) => console.error(err));