import { Component } from '@angular/core';
import { HeaderComponent } from "../../componentes/header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {

}
