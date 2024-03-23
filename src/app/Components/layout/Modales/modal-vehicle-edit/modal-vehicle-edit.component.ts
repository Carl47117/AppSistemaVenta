import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServiceTicketService } from '../../../../Services/service-tikcet.service';

import { VehicleInfo } from '../../../../Interfaces/VehicleInfo';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { ClientInfo } from '../../../../Interfaces/client-info';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientInfoService } from '../../../../Services/client-info.service';
@Component({
  selector: 'app-modal-vehicle-edit',
  templateUrl: './modal-vehicle-edit.component.html',
  styleUrl: './modal-vehicle-edit.component.css',
})
export class ModalVehicleEditComponent implements OnInit {
  buttonAccion: string = 'Save';
  tituloAccion: string = 'Add';
  listClientInfo: ClientInfo[] = [];
  fechaRegistro: string = '';
  numeroDocumento: string = '';
  tipoPago: string = '';
  total: string = '';
  bloquearBotonRegistrar: boolean = false;
  formVehicleInfo: FormGroup;
  constructor(
    private modelActual: MatDialogRef<ModalVehicleEditComponent>,
    private _clientInfoService: ClientInfoService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public vehicleInfo: VehicleInfo,
    private _serviceTicketService: ServiceTicketService,
    private _utilidadService: UtilidadService
  ) {
    this.formVehicleInfo = this.fb.group({
      idVehicle: ['-1'],
      idClient: [''],
      carMaker: ['', Validators.required],
      carModel: ['', Validators.required],
      carYear: ['', Validators.required],
      vin: ['', Validators.required],
      licensePlate: ['', Validators.required],
      currentMileage: ['', Validators.required],
    });
    if (this.vehicleInfo.idVehicle != null) {
      this.tituloAccion = 'Edit';
      this.buttonAccion = 'Modify';
    }
  }

  ngOnInit(): void {
    if (this.vehicleInfo != null) {
      this.formVehicleInfo.patchValue({
        idClient: this.vehicleInfo.idClient,
        idVehicle: this.vehicleInfo.idVehicle,
        carMaker: this.vehicleInfo.carMaker,
        carModel: this.vehicleInfo.carModel,
        carYear: this.vehicleInfo.carYear,
        vin: this.vehicleInfo.vin,
        licensePlate: this.vehicleInfo.licensePlate,
        currentMileage: this.vehicleInfo.currentMileage,
      });
    }
  }

  VehicleCreateEdit() {
    const _vehicle: VehicleInfo = {
      idClient: this.formVehicleInfo.value.idClient,
      idVehicle: this.formVehicleInfo.value.idVehicle,
      carMaker: this.formVehicleInfo.value.carMaker,
      carModel: this.formVehicleInfo.value.carModel,
      carYear: this.formVehicleInfo.value.carYear,
      vin: this.formVehicleInfo.value.vin,
      licensePlate: this.formVehicleInfo.value.licensePlate,
      currentMileage: this.formVehicleInfo.value.currentMileage,
    };
    if (this.vehicleInfo.idVehicle == null) {
      this._clientInfoService.createVehicle(_vehicle).subscribe({
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
      });
    } else {
      this._clientInfoService.editVehicle(_vehicle).subscribe({
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
      });
    }
  }
}
