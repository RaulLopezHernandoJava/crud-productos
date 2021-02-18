import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule } from '@angular/forms';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BuscarProductoComponent } from './buscar-producto/buscar-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ProductoDetalleComponent,
    MensajesComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    BuscarProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
