import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',  // Aquí haces referencia al archivo HTML
  styleUrls: ['./header.component.css']  // Y al archivo de estilos, si es necesario
})
export class HeaderComponent {
  @Input() userInfo: any;  // Información del usuario (incluyendo el rol)
  @Input() title: string = 'CLASSIQUE';
  @Output() searchEvent = new EventEmitter<string>();

  searchQuery: string = '';

  menuOpen = false;

  openMenu() {
    this.menuOpen = true;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  onSearch() {
    this.searchEvent.emit(this.searchQuery);  // Emite la búsqueda al componente padre
  }
  
  // Método para obtener la URL del avatar según el rol
  getAvatarUrl(role: string): string {
    if (role === 'ADMIN') {
      return 'assets/img/header/avatar.png';  // Imagen de avatar para admin
    } else if (role === 'USER') {
      return 'assets/img/user-avatar.png';  // Imagen de avatar para usuario
    } else {
      return 'assets/img/default-avatar.png';  // Imagen por defecto en caso de un rol no identificado
    }
  }
}
