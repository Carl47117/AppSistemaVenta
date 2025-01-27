import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServiceTicketService } from '../../../../Services/service-tikcet.service';

import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { ClientInfo } from '../../../../Interfaces/client-info';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientInfoService } from '../../../../Services/client-info.service';
@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrl: './modal-client.component.css',
})
export class ModalClientComponent implements OnInit {
  buttonAccion: string = 'Save';
  tituloAccion: string = 'Add';
  listClientInfo: ClientInfo[] = [];
  fechaRegistro: string = '';
  numeroDocumento: string = '';
  tipoPago: string = '';
  total: string = '';
  columnasTabla: string[] = ['producto', 'cantidad', 'precio', 'total'];
  bloquearBotonRegistrar: boolean = false;
  formClient: FormGroup;
  constructor(
    private _clientInfoService: ClientInfoService,
    private modelActual: MatDialogRef<ModalClientComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public clientInfo: ClientInfo,
    private _utilidadService: UtilidadService
  ) {
    this.formClient = this.fb.group({
      idClient: ['-1'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      clientIdentification: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
      physicalAddress: ['', Validators.required],
    });
    if (this.clientInfo != null) {
      this.tituloAccion = 'Edit';
      this.buttonAccion = 'Modify';
    }
  }

  ngOnInit(): void {
    if (this.clientInfo != null) {
      this.formClient.patchValue({
        idClient: this.clientInfo.idClient,
        firstName: this.clientInfo.firstName,
        lastName: this.clientInfo.lastName,
        clientIdentification: this.clientInfo.clientIdentification,
        phoneNumber: this.clientInfo.phoneNumber,
        emailAddress: this.clientInfo.emailAddress,
        physicalAddress: this.clientInfo.physicalAddress,
      });
    }
  }

  createClientInfo() {
    if (this.listClientInfo.length > 0) {
      this.bloquearBotonRegistrar = true;
      const request: ClientInfo = this.listClientInfo[0];

      this._clientInfoService.registrar(request).subscribe({
        next: (response) => {
          if (response.status) {
            Swal.fire({
              icon: 'success',
              title: 'Usuario Registrada!',
              text: `Numero de venta: ${response.value.numeroDocumento}`,
            });
          } else
            this._utilidadService.MostrarAlerta(
              'No se pudo registrar la venta',
              'Oops'
            );
        },
        complete: () => {
          this.bloquearBotonRegistrar = false;
        },

        error: (e) => {},
      });
    }
  }

  createModifyClientInfo() {
    const _usuario: ClientInfo = {
      idClient: this.formClient.value.idClient,
      firstName: this.formClient.value.firstName,
      lastName: this.formClient.value.lastName,
      clientIdentification: this.formClient.value.clientIdentification,
      phoneNumber: this.formClient.value.phoneNumber,
      emailAddress: this.formClient.value.emailAddress,
      physicalAddress: this.formClient.value.physicalAddress,
    };
    if (this.clientInfo == null) {
      this._clientInfoService.guardar(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadService.MostrarAlerta(
              'El usuario fue registrado correctamente',
              'Exito'
            );
            this.modelActual.close('true');
          } else
            this._utilidadService.MostrarAlerta(
              'El usuario no fue registrado',
              'Exito'
            );
        },
        error: (e) => {},
      });
    } else {
      this._clientInfoService.editar(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadService.MostrarAlerta(
              'El usuario fue editado correctamente',
              'Exito'
            );
            this.modelActual.close('true');
          } else
            this._utilidadService.MostrarAlerta(
              'El usuario no fue editado',
              'Exito'
            );
        },
        error: (e) => {},
      });
    }
  }
}
