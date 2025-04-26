import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',  // Aquí haces referencia al archivo HTML
  styleUrls: ['./header.component.css']  // Y al archivo de estilos, si es necesario
})
export class HeaderComponent {
  @Input() userInfo: any;  // Información del usuario (incluyendo el rol)
  @Input() title: string = 'CLASSIQUE';
  @Output() searchEvent = new EventEmitter<string>();

  searchQuery: string = '';
  recentSearches: string[] = [];

  isSearchOpen: boolean = false;

  constructor(private router: Router) {}

  menuOpen = false;

  openMenu() {
    this.menuOpen = true;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  

  /* Buscador */
  ngOnInit() {
    this.loadRecentSearches();
  }
  openSearch() {
    this.isSearchOpen = true;
    if(this.searchQuery.trim() !== '') {
      this.saveSearch(this.searchQuery.trim());
      this.searchQuery = ''; // Limpiar el campo de búsqueda al abrir el buscador
    }
  }

  closeSearch() {
    this.isSearchOpen = false;
  }

  saveSearch(query: string) {
    let searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
  
    // Evitar duplicados
    if (!searches.includes(query)) {
      searches.unshift(query); // Agregar al principio
    }
  
    // Guardar máximo 5 búsquedas recientes
    if (searches.length > 5) {
      searches = searches.slice(0, 5);
    }
  
    localStorage.setItem('recentSearches', JSON.stringify(searches));
    this.recentSearches = searches;
  }
  
  loadRecentSearches() {
    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    this.recentSearches = searches;
  }

  search() {
    if (this.searchQuery.trim()) {
      this.saveSearch(this.searchQuery.trim());
      this.router.navigate([`/buscar/${this.searchQuery}`]);
      this.searchQuery = ''; // Limpiar el campo después de buscar
      this.closeSearch();
    }
  }

  eliminarBusqueda(searchToRemove: string) {
    this.recentSearches = this.recentSearches.filter(search => search !== searchToRemove);
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }

  
  
}
