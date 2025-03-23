

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // Importar HttpClient
import { provideRouter, Route } from '@angular/router';
import { AppComponent } from './app/app.component';  // Importar AppComponent
import { LoginComponent } from './app/paginas/login/login.component';
import { RegistroComponent } from './app/paginas/registro/registro.component';
import { MarcasComponent } from './app/paginas/marcas/marcas.component';
import { routes } from './app/app.routes';

// Definir las rutas
/*const routes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirige por defecto a login
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'marcas', component: MarcasComponent },
];*/

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Proveer las rutas definidas
    provideHttpClient(),    // Habilitar HttpClient para peticiones HTTP
  ]
})
  .catch((err) => console.error(err));