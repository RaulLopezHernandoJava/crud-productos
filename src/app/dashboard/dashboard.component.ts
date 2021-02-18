import { ProductoService } from './../producto.service';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  productos:Producto[] = [];
  constructor(private ProductoService: ProductoService) {}


  getProductos():void{
    this.ProductoService.getProductos()
    .subscribe(productos => this.productos = productos.slice(1,5));
  }


  ngOnInit(): void {
    this.getProductos();
  }

}
