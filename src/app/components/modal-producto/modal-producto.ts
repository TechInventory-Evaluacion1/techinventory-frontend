import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-modal-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-producto.html',
  styleUrl: './modal-producto.css'
})
export class ModalProductoComponent implements OnInit {
  @Input() productoEditar: Producto | null = null;
  @Output() guardar = new EventEmitter<Partial<Producto>>();
  @Output() cerrar = new EventEmitter<void>();

  productoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Leemos urlImagen o imagenUrl indistintamente para evitar descalces
    const urlFoto = (this.productoEditar as any)?.urlImagen || this.productoEditar?.imagenUrl || '';

    this.productoForm = this.fb.group({
      nombre: [this.productoEditar?.nombre || '', [Validators.required, Validators.minLength(3)]],
      categoria: [this.productoEditar?.categoria || 'Electrónica', [Validators.required]],
      precio: [this.productoEditar?.precio ?? null, [Validators.required, Validators.min(0)]],
      stockActual: [this.productoEditar?.stockActual ?? (this.productoEditar as any)?.stock ?? 0, [Validators.required, Validators.min(0)]],
      codigoBarras: [this.productoEditar?.codigoBarras || ''],
      ubicacionBodega: [this.productoEditar?.ubicacionBodega || ''],
      imagenUrl: [urlFoto]
    });
  }

  onSubmit(): void {
    const valores = this.productoForm.getRawValue();
    const precio = Number(valores.precio);
    const stock = Number(valores.stockActual);

    const datosParaBackend: Record<string, unknown> = {
      // Si estamos editando, conservamos el ID del producto
      ...(this.productoEditar?.id ? { id: this.productoEditar.id } : {}),
      nombre: String(valores.nombre ?? '').trim(),
      categoria: valores.categoria,
      precio: Number.isFinite(precio) ? precio : 0,
      stock: Number.isFinite(stock) ? stock : 0,
      codigoBarras: valores.codigoBarras || null,
      ubicacionBodega: valores.ubicacionBodega || null,
      urlImagen: valores.imagenUrl || null
    };

    if (!datosParaBackend['nombre'] || this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    this.guardar.emit(datosParaBackend as Partial<Producto>);
  }

  onCerrar(): void {
    this.cerrar.emit();
  }
}