export interface Producto {
  id?: number;
  nombre: string;
  categoria: string;
  precio: number;
  stockActual?: number;
  stock?: number;
  codigoBarras?: string;
  stockMinimo?: number;
  ubicacionBodega?: string;
  urlImagen?: string;
  imagenUrl?: string;
}