import { Component } from '@angular/core';
import { HeaderComponent } from "../../componentes/header/header.component";

@Component({
  selector: 'app-editar-perfil',
  imports: [HeaderComponent],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
  user = {
    name: '',
    photo: null,
    bio: ''
  };

  

}
