import { BuscarProductoComponent } from './buscar-producto/buscar-producto.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Empezamos a meter rutas para mostrar
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'productos', component: ProductosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ProductoDetalleComponent},
  { path: 'buscador', component: BuscarProductoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
