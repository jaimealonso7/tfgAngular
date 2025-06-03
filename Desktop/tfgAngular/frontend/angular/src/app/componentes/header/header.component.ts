import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FiltroCategoriasComponent } from "../filtro-categorias/filtro-categorias.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatSidenavModule, MatButtonModule, MatIconModule, FiltroCategoriasComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() userInfo: any;
  @Input() title: string = 'CLASSIQUE';
  @Output() searchEvent = new EventEmitter<string>();

  searchQuery: string = '';
  recentSearches: string[] = [];
  categoriasAbiertas = false;
  isSearchOpen: boolean = false;
  menuOpen = false;

  filtros: { [key in 'ropa' | 'accesorios' | 'perfumes']: string[] } = {
    ropa: [],
    accesorios: [],
    perfumes: []
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadRecentSearches();
  }

  openMenu() {
    this.menuOpen = true;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  openSearch() {
    this.isSearchOpen = true;
    if (this.searchQuery.trim() !== '') {
      this.saveSearch(this.searchQuery.trim());
      this.searchQuery = '';
    }
  }

  closeSearch() {
    this.isSearchOpen = false;
  }

  saveSearch(query: string) {
    let searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    if (!searches.includes(query)) {
      searches.unshift(query);
    }
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
      this.searchQuery = '';
      this.closeSearch();
    }
  }

  eliminarBusqueda(searchToRemove: string) {
    this.recentSearches = this.recentSearches.filter(search => search !== searchToRemove);
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }

  toggleCategorias() {
    this.categoriasAbiertas = !this.categoriasAbiertas;
  }

  onFiltroChange(tipo: 'ropa' | 'accesorios' | 'perfumes', categoriasSeleccionadas: string[]) {
    // Reiniciar todos los filtros
    this.filtros = {
      ropa: [],
      accesorios: [],
      perfumes: []
    };
  
    // Activar solo el filtro actual
    this.filtros[tipo] = categoriasSeleccionadas;
  
    // Navegar si hay selección
    if (categoriasSeleccionadas.length > 0) {
      const categoria = categoriasSeleccionadas[0];
      this.menuOpen = false;
      this.router.navigate(['/categoria', categoria.toLowerCase()]);
    }
  }
  
  
}
