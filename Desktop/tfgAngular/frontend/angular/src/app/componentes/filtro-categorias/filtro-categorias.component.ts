import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtro-categorias',
  templateUrl: './filtro-categorias.component.html',
  styleUrls: ['./filtro-categorias.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FiltroCategoriasComponent {
  @Input() titulo: string = '';
  @Input() categorias: string[] = [];
  @Input() seleccionadas: string[] = [];
  @Output() seleccionadasChange = new EventEmitter<string[]>();

  abierto: boolean = false;

  toggle(): void {
    this.abierto = !this.abierto;
  }

  toggleSeleccion(categoria: string) {
    // Siempre seleccionar solo una categoría (como radio button)
    this.seleccionadas = [categoria];
    this.seleccionadasChange.emit(this.seleccionadas);
  }
}
