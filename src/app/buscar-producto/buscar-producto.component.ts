import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Producto } from './../producto';
import { ProductoService } from './../producto.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  productos$: Observable<Producto[]>;
  private terminosBusqueda= new Subject<string>();



  constructor(private productoService :ProductoService) { }

  buscarProductos(producto: string): void {
    this.terminosBusqueda.next(producto);
  }


  ngOnInit(): void {

    this.productos$ = this.terminosBusqueda.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((producto: string) => this.productoService.buscarProductos(producto)),
    );
  }

}
