import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Categoria } from '../../../../Interfaces/categoria';
import { Producto } from '../../../../Interfaces/producto';
import { CategoriaService } from '../../../../Services/categoria.service';
import { ProductoService } from '../../../../Services/producto.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrl: './modal-producto.component.css',
})
export class ModalProductoComponent implements OnInit {
  formularioProducto: FormGroup;
  tituloAccion: string = 'Agregar';
  buttonAccion: string = 'Guardar';
  listaCategorias: Categoria[] = [];

  constructor(
    private modelActual: MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProducto: Producto,
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaService,
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioProducto = this.fb.group({
      name: ['', Validators.required],
      IdProductCategory: ['', Validators.required],
      stock: ['', Validators.required],
      precio: ['', Validators.required],
      Active: ['', Validators.required],
    });

    if (this.datosProducto != null) {
      this.tituloAccion = 'Editar';
      this.buttonAccion = 'Actualizar';
    }

    this._categoriaServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.listaCategorias = data.value;
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    if (this.datosProducto != null) {
      this.formularioProducto.patchValue({
        name: this.datosProducto.name,
        IdProductCategory: this.datosProducto.IdProductCategory,
        stock: this.datosProducto.stock,
        precio: this.datosProducto.precio,
        Active: this.datosProducto.Active.toString(),
      });
    }
  }

  guardarEditar_Producto() {
    const _producto: Producto = {
      IdProductItem:
        this.datosProducto == null ? 0 : this.datosProducto.IdProductItem,
      name: this.formularioProducto.value.name,
      IdProductCategory: this.formularioProducto.value.IdProductCategory,
      CategoryDescription: '',
      precio: this.formularioProducto.value.precio,
      stock: this.formularioProducto.value.stock,
      Active: parseInt(this.formularioProducto.value.Active),
    };

    if (this.datosProducto == null) {
      this._productoServicio.guardar(_producto).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.MostrarAlerta(
              'El producto fue registrado correctamente',
              'Exito'
            );
            this.modelActual.close('true');
          } else
            this._utilidadServicio.MostrarAlerta(
              'El producto no fue registrado',
              'Exito'
            );
        },
        error: (e) => {},
      });
    } else {
      this._productoServicio.editar(_producto).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.MostrarAlerta(
              'El producto fue editado correctamente',
              'Exito'
            );
            this.modelActual.close('true');
          } else
            this._utilidadServicio.MostrarAlerta(
              'El producto no fue editado',
              'Exito'
            );
        },
        error: (e) => {},
      });
    }
  }
}
