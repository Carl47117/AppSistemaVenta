import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceTicketService } from '../../../../Services/service-tikcet.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { ServiceTicket } from '../../../../Interfaces/service-ticket';
import { ContactInfo } from '../../../../Interfaces/contact-info';
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

@Component({
  selector: 'app-service-ticket',
  templateUrl: './service-ticket.component.html',
  styleUrl: './service-ticket.component.css',
})
export class ServiceTicketComponent implements OnInit {
  listContactInfo: ContactInfo[] = [];
  listVehicleInfo: VehicleInfo[] = [];
  listProblemDescription: ProblemDescription[] = [];
  listServiceTicket: ServiceTicket[] = [];
  bloquearBotonRegistrar: boolean = false;

  formServiceTicket: FormGroup;
  columnasTabla: string[] = [
    'fullName',
    'phoneNumber',
    'emailAddress',
    'accion',
  ];
  dataListServiceTicket = new MatTableDataSource(this.listServiceTicket);
  dataInicio: ServiceTicket[] = [];
  datosListaServiceTicket = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private _productoService: ServiceTicketService,
    private _utilidadService: UtilidadService,
    private dialog: MatDialog
  ) {
    this.formServiceTicket = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
      physicalAddress: ['', Validators.required],

      carMake: ['', Validators.required],
      carModel: ['', Validators.required],
      carYear: ['', Validators.required],
      vin: ['', Validators.required],

      licensePlate: ['', Validators.required],
      currentMileage: ['', Validators.required],
      maintenanceDetails: ['', Validators.required],
      issueDescription: ['', Validators.required],
      dashboardLights: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.datosListaServiceTicket.paginator = this.paginacionTabla;
  }

  agregarProductoParaVenta() {
    const _fullName: string = this.formServiceTicket.value.fullName;
    const _phoneNumber: string = this.formServiceTicket.value.phoneNumber;
    const _emailAddress: string = this.formServiceTicket.value.emailAddress;
    const _physicalAddress: string =
      this.formServiceTicket.value.physicalAddress;
    const _carMake: string = this.formServiceTicket.value.fullName;
    const _carModel: string = this.formServiceTicket.value.carModel;
    const _carYear: number = this.formServiceTicket.value.carYear;
    const _vin: string = this.formServiceTicket.value.vin;
    const _licensePlate: string = this.formServiceTicket.value.licensePlate;
    const _currentMileage: number = this.formServiceTicket.value.currentMileage;
    const _maintenanceDetails: string =
      this.formServiceTicket.value.maintenanceDetails;
    const _issueDescription: string =
      this.formServiceTicket.value.issueDescription;
    const _dashboardLights: string =
      this.formServiceTicket.value.dashboardLights;

    this.listServiceTicket.push({
      fullName: _fullName,
      phoneNumber: _phoneNumber,
      emailAddress: _emailAddress,
      physicalAddress: _physicalAddress,
      carMake: _carMake,
      carModel: _carModel,
      carYear: _carYear,
      vin: _vin,
      licensePlate: _licensePlate,
      currentMileage: _currentMileage,
      maintenanceDetails: _maintenanceDetails,
      issueDescription: _issueDescription,
      dashboardLights: _dashboardLights,
    });

    /* this.listServiceTicket[0].contactInfo = this.listContactInfo;

    this.formServiceTicket.patchValue({
      producto: '',
      cantidad: '',
    });*/
  }

  registrarVenta() {
    if (this.listServiceTicket.length > 0) {
      this.bloquearBotonRegistrar = true;
      const request: ServiceTicket = this.listServiceTicket[0];

      this._productoService.registrar(request).subscribe({
        next: (response) => {
          if (response.status) {
            this.datosListaServiceTicket = response.value;
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
  }
  verDetalleVenta(_venta: ServiceTicket) {
    this.dialog.open(ModalServiceTicketComponent, {
      data: _venta,
      disableClose: true,
      width: '700px',
    });
  }
}
