import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../Interfaces/rol';
import { Usuario } from '../../../../Interfaces/usuario';

import { RolService } from '../../../../Services/rol.service';
import { UsuarioService } from '../../../../Services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css',
})
export class ModalUsuarioComponent implements OnInit {
  formularioUsuario: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = 'Agregar';
  buttonAccion: string = 'Guardar';
  listaRoles: Rol[] = [];

  constructor(
    private modelActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
    private fb: FormBuilder,
    private _rolServicio: RolService,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioUsuario = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      idRol: ['', Validators.required],
      password: ['', Validators.required],
      Active: ['1', Validators.required],
    });

    if (this.datosUsuario != null) {
      this.tituloAccion = 'Editar';
      this.buttonAccion = 'Actualizar';
    }
    this._rolServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.listaRoles = data.value;
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    if (this.datosUsuario != null) {
      this.formularioUsuario.patchValue({
        firstName: this.datosUsuario.firstName,
        email: this.datosUsuario.email,
        idRol: this.datosUsuario.idRol,
        password: this.datosUsuario.password,
        Active: this.datosUsuario.Active.toString(),
      });
    }
  }

  guardarEditar_Usuario() {
    const _usuario: Usuario = {
      idUser: this.datosUsuario == null ? 0 : this.datosUsuario.idUser,
      firstName: this.formularioUsuario.value.firstName,
      email: this.formularioUsuario.value.email,
      idRol: this.formularioUsuario.value.idRol,
      rolDescription: '',
      password: this.formularioUsuario.value.password,
      Active: parseInt(this.formularioUsuario.value.Active),
    };
    if (this.datosUsuario == null) {
      this._usuarioServicio.guardar(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.MostrarAlerta(
              'El usuario fue registrado correctamente',
              'Exito'
            );
            this.modelActual.close('true');
          } else
            this._utilidadServicio.MostrarAlerta(
              'El usuario no fue registrado',
              'Exito'
            );
        },
        error: (e) => {},
      });
    } else {
      this._usuarioServicio.editar(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.MostrarAlerta(
              'El usuario fue editado correctamente',
              'Exito'
            );
            this.modelActual.close('true');
          } else
            this._utilidadServicio.MostrarAlerta(
              'El usuario no fue editado',
              'Exito'
            );
        },
        error: (e) => {},
      });
    }
  }
}
