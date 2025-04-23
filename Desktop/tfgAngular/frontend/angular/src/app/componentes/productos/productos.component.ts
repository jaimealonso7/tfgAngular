import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  imports: [HeaderComponent]
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const idMarca = params['idMarca'];

      if (idMarca) {
        this.http.get<any[]>(`http://localhost:3000/api/productos?idMarca=${idMarca}`)
          .subscribe({
            next: data => this.productos = data,
            error: err => console.error('Error al cargar productos:', err)
          });
      }
    });
  }
}
