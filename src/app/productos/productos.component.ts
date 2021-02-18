import { MensajeService } from './../mensaje.service';
import { ProductoService } from './../producto.service';
import { Producto } from './../producto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  title = "Listado de Productos";


  productos: Producto[];

  // selectedProducto?: Producto;

  // El array de productos se inyecta a traves del constructor proveniente del 'productoService'
  // que sera el encargado de servir los datos


  constructor(private productosServices: ProductoService, private mensajeService: MensajeService) { }

  // onSelectProducto(producto: Producto) {
  //   this.selectedProducto = producto;
  //   this.mensajeService.add(`ProductosComponent : El id del producto seleccionado es id = ${producto.id}`)
  // }



  // Añadimos un metodo para cojer los productos a traves del servicio

  getProductos(): void {

    // En este momomento estamos a la espera de que el service nos devuelva los productos.
    // Como en la vida real esta recepcion puede que tarde o no se de de inmediato .
    // Que se de ASINCRONAMENTE y es en este momento donde aparece Observable

    this.productosServices.getProductos()
      .subscribe(productos => this.productos = productos);
  }

  anadirProducto(nombre: string): void {
    nombre = nombre.trim();
    if (!nombre) { return; }
    this.productosServices.anadirProducto({ nombre } as Producto)
      .subscribe(producto => {
        this.productos.push(producto);
      })
  }

  eliminarProducto(producto: Producto): void {
    this.productos = this.productos.filter(p => p !== producto);
    this.productosServices.eliminarProducto(producto).subscribe();
  }


  ngOnInit(): void {
    this.getProductos();
  }

}
