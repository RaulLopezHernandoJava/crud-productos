import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MensajeService } from './mensaje.service';
import { PRODUCTOS } from './mock-productos';
import { Producto } from './producto';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Importamos la clase 'Producto' y el array de 'Productos'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // Raiz para la aplicacion de productos

  private productosUrl = 'http://localhost:3000/productos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private mensajeService: MensajeService,
    private http: HttpClient,
    ) { }
  // Este metodo es con RXJS

  // getProductos(): Observable<Producto[]> {
  //   this.mensajeService.add('HeroService: fetched heroes');
  //   return of(PRODUCTOS);
  // }

  // Hay que convertir el metodo anterior con RXJS a HTTP

  // OBTENER PRODUCTOS (GET) -- Obtener productos del Servidor.
  // Como puede haber un error al obtener los productos hay que gestionarlo

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl)
      .pipe(
        tap(_ => this.log('Productos Obtenidos')),
        catchError(this.handleError<Producto[]>('getProductos', []))
      );
  }


  // OBTENER UN SOLO PRODUCTO (GET)

  getProducto(id: number): Observable<Producto> {
    const url = `${this.productosUrl}/${id}`;
    return this.http.get<Producto>(url).pipe(
      tap(_ => this.log(`Producto Obtenido id=${id}`)),
      catchError(this.handleError<Producto>(`getProducto id=${id}`))
    );
  }

  // ACTUALIZAR PRODUCTO (PUT)

  updateProducto(producto: Producto) {
    return this.http.put(this.productosUrl +"/"+producto.id, producto, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Producto Actualizado id=${producto.id}`)),
        catchError(this.handleError<any>('updateProducto'))
      )
  }


  // AÑADIR PRODUCTO (POST)

  anadirProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.productosUrl, producto, this.httpOptions)
      .pipe(
        tap((newproducto: Producto) => this.log(`Producto Añadido w/ id=${newproducto.id}`)),
        catchError(this.handleError<Producto>('addProducto'))
      );

  }

  // DELETE (ELIMINAR PRODUCTO)

  eliminarProducto(producto: Producto | number): Observable<Producto> {
    const id = typeof producto === 'number' ? producto : producto.id;
    const url = `${this.productosUrl}/${id}`;

    return this.http.delete<Producto>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted producto id=${id}`)),
      catchError(this.handleError<Producto>('eliminarProducto'))
    );
  }

  buscarProductos(producto: string): Observable<Producto[]> {
    if (!producto.trim()) {
      return of([]);
    }
    return this.http.get<Producto[]>(`${this.productosUrl}/?nombre=${producto}`).pipe(
      tap(x => x.length ?
         this.log(`Encontrar Productos por :  "${producto}"`) :
         this.log(`La busqueda de Productos por  "${producto}" no ha producido resultados`)),
      catchError(this.handleError<Producto[]>('buscarProductos',[]))
    );
  }


  // Mensajes Personalizados
  private log(mensaje: string) {
    this.mensajeService.add(`ProductoService: ${mensaje}`);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
