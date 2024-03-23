import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceTicketService } from '../../../../Services/service-tikcet.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { ServiceTicket } from '../../../../Interfaces/service-ticket';
import Swal from 'sweetalert2';

import { response } from 'express';

import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { VehicleInfo } from '../../../../Interfaces/VehicleInfo';
import { ProblemDescription } from '../../../../Interfaces/problem-description';

import { ModalServiceTicketComponent } from '../../Modales/modal-service-ticket/modal-service-ticket.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalVehicleComponent } from '../../Modales/modal-vehicle/modal-vehicle.component';
import { ClientInfo } from '../../../../Interfaces/client-info';
import { ClientInfoService } from '../../../../Services/client-info.service';
@Component({
  selector: 'app-service-ticket',
  templateUrl: './service-ticket.component.html',
  styleUrl: './service-ticket.component.css',
})
export class ServiceTicketComponent implements OnInit {
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
    this.dialog.open(ModalServiceTicketComponent, {
      data: _cliente,
      disableClose: true,
      width: '700px',
    });
  }
  createClient() {
    this.dialog.open(ModalServiceTicketComponent, {
      disableClose: true,
      width: '700px',
    });
  }

  verDetalleVehiculo(_venta: VehicleInfo) {
    this.dialog.open(ModalVehicleComponent, {
      data: _venta,
      disableClose: true,
      width: '100%',
    });
  }
}
