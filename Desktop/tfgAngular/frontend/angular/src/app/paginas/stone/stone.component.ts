import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from "../../componentes/product-card/product-card.component";
import { Product } from '../../modelos/product.model';
import { HeaderComponent } from "../../componentes/header/header.component";

export const products: Product[] = [
  {
    image: 'assets/img/stone/jersey0.avif',
    imagenHover: 'assets/img/stone/jersey5.avif',
    name: 'Organic soft cotton',
    description: 'Jersey de cuello redondo de suave punto de algodón orgánico en punto liso del revés y hombros raglán.',
    unitAvailable: 18,
    color: 'blue',
    price: '215.00'
  },

  {
    image: 'assets/img/stone/jersey5.avif',
    imagenHover: 'assets/img/stone/jersey5.avif',
    name: 'Organic cotton fleece',
    description: 'Sudadera de cuello redondo de punto polar de algodón orgánico con cuello acanalado, costuras overlock.',
    unitAvailable: 18,
    color: 'orange',
    price: '350.00',
  },

  {
    image: 'assets/img/stone/jersey4.avif',
    name: 'Organic cotton waffle',
    description: 'Sudadera de punto polar gofrado de algodón orgánico con marga raglán, paneles de punto de algodón.',
    unitAvailable: 18,
    color: 'black',
    price: '395.00',
    imagenHover: 'assets/img/stone/jersey5.avif',
  },

  {
    image: 'assets/img/stone/jersey3.avif',
    name: 'Organic cotton fleece',
    description: 'Sudadera de punto polar de algodón orgánico con capucha con cordón ajustable.',
    unitAvailable: 18,
    color: 'azul',
    price: '345.00',
    imagenHover: 'assets/img/stone/jersey5.avif',
  },
  
  {
    image: 'assets/img/stone/pantalon.avif',
    name: 'STRETCH COTTON CANVAS',
    description: 'Pantalón cargo de lona elástica de algodón recio con aspecto ligeramente desgastado y varios bolsillos.',
    unitAvailable: 18,
    color: 'black',
    price: '225.00',
    imagenHover: 'assets/img/stone/jersey5.avif',
  },

  {
    image: 'assets/img/stone/pantalon2.avif',
    name: 'SUPIMA COTTON TWILL',
    description: 'Pantalón cargo de sarga de algodón elástico confeccionada con hilo de algodón.',
    unitAvailable: 18,
    color: 'black',
    price: '360.00',
    imagenHover: 'assets/img/stone/jersey5.avif',
  },

  {
    image: 'assets/img/stone/pantalon3.avif',
    name: 'COTTON FLEECE',
    description: 'Bermudas cargo de punto polar de algodón con bolsillos para las manos y cordón ajustable.',
    unitAvailable: 18,
    color: 'black',
    price: '280.00',
    imagenHover: 'assets/img/stone/jersey5.avif',
  },

  {
    image: 'assets/img/stone/pantalon4.avif',
    name: 'COTTON FLEECE',
    description: 'Bermudas cargo de punto polar de algodón con bolsillos para las manos y cordón ajustable.',
    unitAvailable: 18,
    color: 'grey',
    price: '280.00',
    imagenHover: 'assets/img/stone/jersey5.avif',
  },

  

  {
    image: 'assets/img/stone/abrigo1.avif',
    name: 'CRINKLE REPS NYLON',
    description: 'Bómber de un ligero nailon rep reciclado 100% con revestimiento interno de resina.',
    unitAvailable: 18,
    color: 'black',
    price: '370.00',
    imagenHover: ''
  },
  {
    image: 'assets/img/stone/abrigo2.avif',
    name: 'NYLON SMERIGLIATO GHOST',
    description: 'Chaqueta con capucha de Nylon Tela especial, perchado para conseguir un tacto suave.',
    unitAvailable: 18,
    color: 'grey',
    price: '280.00',
    imagenHover: ''
  },
  {
    image: 'assets/img/stone/camiseta1.avif',
    name: 'COMBED ORGANIC COTTON',
    description: 'Camiseta de manga corta de algodón orgánico con el logotipo de Stone Island en el pecho y un estampado.',
    unitAvailable: 18,
    color: 'black',
    price: '195.00',
    imagenHover: ''
  },
  {
    image: 'assets/img/stone/polo1.avif',
    name: 'CREPE COTTON JERSEY',
    description: 'Polo de manga corta de punto de crepé de algodón con cierre de dos botones en el cuello',
    unitAvailable: 18,
    color: 'grey',
    price: '260.00',
    imagenHover: ''
  },

  {
    image: 'assets/img/stone/accesorio1.avif',
    name: 'Nylon metal in econyl',
    description: 'Mochila triangular de un tirante de Nylon Metal de la edición especial para el año de la serpiente.',
    unitAvailable: 18,
    color: 'black',
    price: '420.00',
    imagenHover: ''
  },
  {
    image: 'assets/img/stone/accesorio2.avif',
    name: 'Nylon metal in econyl',
    description: 'Sombrero de pescador confeccionado con hilos regenerados, con el logotipo bordado en relieve.',
    unitAvailable: 18,
    color: 'grey',
    price: '165.00',
    imagenHover: ''
  },
  {
    image: 'assets/img/stone/accesorio3.avif',
    name: 'Rubberised Silicone',
    description: 'Funda para iPhone 16 de silicona engomada inspirada en los parchees de goma en bajorrelieve con logotipo.',
    unitAvailable: 18,
    color: 'black',
    price: '95.00',
    imagenHover: ''
  },
  {
    image: 'assets/img/stone/accesorio4.avif',
    name: 'Nylon-Polyester tape',
    description: 'Llavero de resistente cinta de nailon-poliéster con inscripción Stone Island en relieve y engomada.',
    unitAvailable: 18,
    color: 'grey',
    price: '95.00',
    imagenHover: ''
  },
  
];

@Component({
  selector: 'app-stone',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, HeaderComponent],
  templateUrl: './stone.component.html',
  styleUrl: './stone.component.css'
})
export class StoneComponent {

  styles = {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    padding: '20px',
    width: '200px',
  };


  // Ahora, los productos están correctamente tipados usando la interfaz Product
  products: Product[] = [];

  ngOnInit(): void {
    // Asigna correctamente los productos al arreglo products
    this.products = products;
    console.log(this.products);  // Verifica si los productos se asignan correctamente
  }

}
