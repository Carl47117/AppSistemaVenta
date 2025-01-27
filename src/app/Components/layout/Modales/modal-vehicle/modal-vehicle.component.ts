import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../Interfaces/rol';
import { Usuario } from '../../../../Interfaces/usuario';

import { MatTableDataSource } from '@angular/material/table';
import { ClientInfo } from '../../../../Interfaces/client-info';
import { VehicleInfo } from '../../../../Interfaces/VehicleInfo';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ClientInfoService } from '../../../../Services/client-info.service';
import { ModalVehicleEditComponent } from '../modal-vehicle-edit/modal-vehicle-edit.component';
@Component({
  selector: 'app-modal-vehicle',
  templateUrl: './modal-vehicle.component.html',
  styleUrl: './modal-vehicle.component.css',
})
export class ModalVehicleComponent implements OnInit {
  columnasTabla: string[] = [
    'carMaker',
    'carModel',
    'carYear',
    'carYear',
    'vin',
    'licensePlate',
    'currentMileage',
    'accion',
  ];

  listVehicleInfo: VehicleInfo[] = [];
  dataVehicleInfo = new MatTableDataSource(this.listVehicleInfo);
  buttonAccion: string = 'Save';
  tituloAccion: string = 'Add';
  fechaRegistro: string = '';
  numeroDocumento: string = '';
  tipoPago: string = '';
  total: string = '';
  bloquearBotonRegistrar: boolean = false;
  formVehicle: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public clientInfo: ClientInfo,
    private _clientInfoService: ClientInfoService,
    private _utilidadService: UtilidadService,
    private dialog: MatDialog
  ) {
    this.formVehicle = this.fb.group({
      idVehicle: ['', Validators.required],
      carMaker: ['', Validators.required],
      carModel: ['', Validators.required],
      carYear: ['', Validators.required],
      vin: ['', Validators.required],
      licensePlate: ['', Validators.required],
      currentMileage: ['', Validators.required],
    });
    if (this.clientInfo != null) {
      this.getVehicles();
    }
  }
  getVehicles() {
    this._clientInfoService.listVehicle(this.clientInfo).subscribe({
      next: (data) => {
        if (data.status) this.dataVehicleInfo.data = data.value;
        else
          this._utilidadService.MostrarAlerta('No se encontraron datos', 'Ops');
      },
      error: (e) => {},
    });
  }
  createVehicles(_venta: VehicleInfo) {
    this.dialog
      .open(ModalVehicleEditComponent, {
        data: _venta,
        disableClose: true,
        width: '500px',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.getVehicles();
      });
  }

  editVehicle(_venta: VehicleInfo) {
    this.dialog
      .open(ModalVehicleEditComponent, {
        data: _venta,
        disableClose: true,
        width: '500px',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.getVehicles();
      });
  }
  ngOnInit(): void {}
}
