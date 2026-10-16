import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Producto } from '../models/producto.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function mapearProducto(p: any): Producto {
  return { ...p, stockActual: p.stock };
}

export interface ItemReserva {
  productoId: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private catalogoUrl = environment.catalogoApiUrl;
  private inventarioUrl = environment.inventarioApiUrl;

  constructor(private http: HttpClient) {}

  getProductosPublicos(): Observable<any[]> {
    return this.http.get<any[]>(this.catalogoUrl);
  }

  reservar(items: ItemReserva[]): Observable<any> {
    return this.http.post<any>(`${this.catalogoUrl}/reservas`, { items });
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<any[]>(this.inventarioUrl).pipe(
      map(lista => lista.map(mapearProducto))
    );
  }

  getProductoPorId(id: number): Observable<Producto> {
    return this.http.get<any>(`${this.inventarioUrl}/${id}`).pipe(
      map(mapearProducto)
    );
  }

  crearProducto(producto: Partial<Producto>): Observable<Producto> {
    return this.http.post<any>(this.inventarioUrl, producto).pipe(
      map(mapearProducto)
    );
  }

  actualizarProducto(id: number, producto: Partial<Producto>): Observable<Producto> {
    return this.http.put<any>(`${this.inventarioUrl}/${id}`, producto).pipe(
      map(mapearProducto)
    );
  }

  actualizarStock(id: number, nuevoStock: number): Observable<Producto> {
    return this.http.patch<any>(`${this.inventarioUrl}/${id}/stock`, { stock: nuevoStock }).pipe(
      map(mapearProducto)
    );
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.inventarioUrl}/${id}`);
  }
}
