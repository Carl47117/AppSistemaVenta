import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2';

import { response } from 'express';

import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { VehicleInfo } from '../../../../Interfaces/VehicleInfo';
import { ProblemDescription } from '../../../../Interfaces/problem-description';

import { ModalClientComponent } from '../../Modales/modal-client/modal-client.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalVehicleComponent } from '../../Modales/modal-vehicle/modal-vehicle.component';
import { ClientInfo } from '../../../../Interfaces/client-info';
import { ClientInfoService } from '../../../../Services/client-info.service';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  listProblemDescription: ProblemDescription[] = [];
  listclientInfo: ClientInfo[] = [];
  bloquearBotonRegistrar: boolean = false;

  formServiceTicket: FormGroup;
  columnasTabla: string[] = [
    'firstName',
    'phoneNumber',
    'emailAddress',
    'physicalAddress',
    'accion',
  ];
  datosListaClientInfo = new MatTableDataSource(this.listclientInfo);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private _clientInfoService: ClientInfoService,
    private _utilidadService: UtilidadService,
    private dialog: MatDialog
  ) {
    this.formServiceTicket = this.fb.group({
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
      physicalAddress: ['', Validators.required],

      carMakerr: ['', Validators.required],
      carModel: ['', Validators.required],
      carYear: ['', Validators.required],
      vin: ['', Validators.required],

      licensePlate: ['', Validators.required],
      currentMileage: ['', Validators.required],
      maintenanceDetails: ['', Validators.required],
      //issueDescription: ['', Validators.required],
      //dashboardLights: ['', Validators.required],
    });
  }
  getClients() {
    this._clientInfoService.lista().subscribe({
      next: (data) => {
        if (data.status) this.datosListaClientInfo.data = data.value;
        else
          this._utilidadService.MostrarAlerta('No se encontraron datos', 'Ops');
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    this.getClients();
  }

  ngAfterViewInit(): void {
    this.datosListaClientInfo.paginator = this.paginacionTabla;
  }

  agregarProductoParaVenta() {
    const _firstName: string = this.formServiceTicket.value.firstName;
    const _phoneNumber: string = this.formServiceTicket.value.phoneNumber;
    const _emailAddress: string = this.formServiceTicket.value.emailAddress;
    const _physicalAddress: string =
      this.formServiceTicket.value.physicalAddress;

    this.listclientInfo.push({
      firstName: _firstName,
      phoneNumber: _phoneNumber,
      emailAddress: _emailAddress,
      physicalAddress: _physicalAddress,
    });
  }

  registrarVenta() {
    if (this.listclientInfo.length > 0) {
      this.bloquearBotonRegistrar = true;
      const request: ClientInfo = this.listclientInfo[0];

      this._clientInfoService.registrar(request).subscribe({
        next: (response) => {
          if (response.status) {
            Swal.fire({
              icon: 'success',
              title: 'Venta Registrada!',
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

    this.getClients();
  }
  clientInformation(_cliente: ClientInfo) {
    this.dialog
      .open(ModalClientComponent, {
        data: _cliente,
        disableClose: true,
        width: '500px',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.getClients();
      });
  }
  createClient() {
    this.dialog
      .open(ModalClientComponent, {
        disableClose: true,
        width: '500px',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.getClients();
      });
  }

  verDetalleVehiculo(_venta: VehicleInfo) {
    this.dialog
      .open(ModalVehicleComponent, {
        data: _venta,
        disableClose: true,
        width: '100%',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.getClients();
      });
  }
}
