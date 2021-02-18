import { ProductoService } from './../producto.service';
import { Producto } from './../producto';
import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  producto:Producto;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private location : Location
  ) { }

  getProducto():void{
    const id = +this.route.snapshot.paramMap.get('id');
   this.productoService.getProducto(id).subscribe(producto => this.producto = producto);
  }

  updateProducto():void{
    this.productoService.updateProducto(this.producto)
    .subscribe(() => this.volverAtras())
  }

  volverAtras(){
    this.location.back();
  }
  ngOnInit(): void {
    this.getProducto();
  }

}
