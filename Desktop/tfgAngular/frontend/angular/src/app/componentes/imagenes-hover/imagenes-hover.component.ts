import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-imagenes-hover',
  template: `
    <img
      [src]="currentImage"
      [alt]="imagenAlt"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
  `,
  styleUrls: ['./imagenes-hover.component.css']
})

export class ImagenesHoverComponent {
  // Recibimos las imagenes desde el contenedor padre
  @Input() imagenOriginal!: string;
  @Input() imagenHover!: string;
  @Input() imagenAlt!: string;

  currentImage!: string;

  ngOnInit() {
    this.currentImage = this.imagenOriginal;  // Inicializa con la imagen original
  }

  // Método para cambiar la imagen al pasar el ratón
  onMouseEnter() {
    this.currentImage = this.imagenHover;
  }

  onMouseLeave() {
    this.currentImage = this.imagenOriginal;
  }

}
