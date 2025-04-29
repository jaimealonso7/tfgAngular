import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionTimerComponent } from "./componentes/session-timer/session-timer.component";  // Importar RouterModule

@Component({
  selector: 'app-root',
  standalone: true,  // Usamos standalone: true porque estamos usando bootstrapApplication
  imports: [RouterModule, SessionTimerComponent],  // Aseguramos que RouterModule esté disponible
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  // Lógica de tu componente
}
